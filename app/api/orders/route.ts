import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sku?: string | null;
};

type OrderPayload = {
  clientName: string;
  clientContact: string;
  items: OrderItem[];
};

export async function POST(request: Request) {
  const body = (await request.json()) as OrderPayload;

  if (!body.clientName?.trim() || !body.clientContact?.trim() || !body.items?.length) {
    return NextResponse.json({ error: "Missing order details" }, { status: 400 });
  }

  const orderId = crypto.randomUUID();
  const total = body.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const { error } = await supabaseAdmin.from("orders").insert({
    order_id: orderId,
    client_name: body.clientName,
    client_contact: body.clientContact,
    items: body.items,
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
        ...body.items.map(
          (i) =>
            `- ${i.name}${i.sku ? ` [SKU: ${i.sku}]` : ""} x${i.quantity} @ €${i.price.toFixed(2)} = €${(i.price * i.quantity).toFixed(2)}`
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
