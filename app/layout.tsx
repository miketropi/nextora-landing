import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nextora — Modern WordPress & WooCommerce Block Theme",
  description:
    "Nextora is a modern Full Site Editing block theme for WordPress and WooCommerce. Build bespoke client sites and fast stores without bloated page builders.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
