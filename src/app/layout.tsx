import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CartProvider } from "@/lib/cart-context";

const display = Cormorant_Garamond({
  variable: "--font-display",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Euckays | Botanical haircare & skincare, made in Nigeria",
    template: "%s | Euckays",
  },
  description:
    "Discover considered haircare and skincare rooted in Nigerian botanicals. Thoughtful formulas, everyday rituals, and beauty with roots.",
  keywords: [
    "Nigerian haircare products",
    "Nigerian skincare products",
    "natural hair products Nigeria",
    "black soap Nigeria",
    "hair growth oil Nigeria",
    "Farm-to-Beauty",
    "Euckays Industries",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-brand-cream text-brand-black">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
