import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Software4U - Seller Waitlist",
  description: "Join the global marketplace for SaaS products. Early seller benefits await!",
  openGraph: {
    title: "Software4U - Seller Waitlist",
    description: "Join the global marketplace for SaaS products",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
