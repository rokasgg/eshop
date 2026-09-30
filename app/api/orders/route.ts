import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase/server";
import { lineTotal, totalUnits, type CartLine } from "@/lib/cart";

const resend = new Resend(process.env.RESEND_API_KEY);

type OrderItem = Omit<CartLine, "imageUrl">;

type OrderPayload = {
  clientName: string;
  clientContact: string;
  items: OrderItem[];
};

const isWholeBoxes = (n: unknown): n is number => Number.isInteger(n) && (n as number) >= 1;

export async function POST(request: Request) {
  const body = (await request.json()) as OrderPayload;

  if (!body.clientName?.trim() || !body.clientContact?.trim() || !body.items?.length) {
    return NextResponse.json({ error: "Missing order details" }, { status: 400 });
  }

  // Box-based lines only: whole boxes, one line per product.
  const valid = body.items.every(
    (i) =>
      i?.id &&
      isWholeBoxes(i.boxQuantity) &&
      isWholeBoxes(i.unitsPerBox) &&
      typeof i.pricePerBox === "number" &&
      i.pricePerBox >= 0
  );
  if (!valid || new Set(body.items.map((i) => i.id)).size !== body.items.length) {
    return NextResponse.json({ error: "Invalid order lines" }, { status: 400 });
  }

  const items = body.items.map((i) => ({
    id: i.id,
    sku: i.sku ?? null,
    name: i.name,
    boxQuantity: i.boxQuantity,
    unitsPerBox: i.unitsPerBox,
    pricePerBox: i.pricePerBox,
    totalUnits: totalUnits(i),
    lineTotal: lineTotal(i),
  }));

  const orderId = crypto.randomUUID();
  const total = items.reduce((sum, i) => sum + i.lineTotal, 0);

  const { error } = await supabaseAdmin.from("orders").insert({
    order_id: orderId,
    client_name: body.clientName,
    client_contact: body.clientContact,
    items,
    status: "pending",
  });

  if (error) {
    return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Ahmad Tea Orders <onboarding@resend.dev>",
      to: process.env.ORDER_NOTIFICATION_EMAIL || "temus@ahmadarbata.lt",
      subject: `New order ${orderId}`,
      text: [
        `Order ID: ${orderId}`,
        `Client: ${body.clientName}`,
        `Contact: ${body.clientContact}`,
        "",
        "Items:",
        ...items.map(
          (i) =>
            `- ${i.name}${i.sku ? ` [SKU: ${i.sku}]` : ""}: ${i.boxQuantity} box(es) × €${i.pricePerBox.toFixed(2)}` +
            ` (${i.unitsPerBox} units/box, ${i.totalUnits} units) = €${i.lineTotal.toFixed(2)}`
        ),
        "",
        `Total: €${total.toFixed(2)}`,
      ].join("\n"),
    });
  } catch (err) {
    // Order is already saved in Supabase; email failure shouldn't block the client.
    console.error("Failed to send order email:", err);
  }

  return NextResponse.json({ orderId });
}
