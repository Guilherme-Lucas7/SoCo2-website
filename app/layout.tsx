import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Só CO₂ | Gases Especiais",
  description: "Gases medicinais e industriais em Brasília.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
