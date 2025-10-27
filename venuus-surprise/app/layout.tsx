import type { Metadata } from "next";
import { Cairo, Dancing_Script } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "مفاجأة خاصة لـ Venuus 💛",
  description: "موقع سري ومفاجأة من Riven",
  robots: "noindex, nofollow", // Keep it secret
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${cairo.variable} ${dancingScript.variable} antialiased`}
        style={{ fontFamily: 'var(--font-cairo)' }}
      >
        {children}
      </body>
    </html>
  );
}
