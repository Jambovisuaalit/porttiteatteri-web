import type { Metadata } from "next";
import "./globals.css";
import "./p0.css";

export const metadata: Metadata = {
  title: "Porttiteatteri — Avoimet portit",
  description:
    "Porttiteatteri on yhteisöteatteri, jossa ihmisyys kohdataan, leimat purkautuvat ja tarinat kirjoitetaan uudelleen.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fi">
      <body>{children}</body>
    </html>
  );
}
