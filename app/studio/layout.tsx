// Sanity Studio needs its own root layout: the site's root layout lives in
// app/[lang] and adds the shop navbar, cart and footer around every page.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
