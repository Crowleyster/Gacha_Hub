import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gacha Hub | Últimas novedades",
  description: "Tu fuente principal de actualizaciones y eventos de juegos gacha.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth suppressHydrationWarning`}>
      <body
        className={`${inter.className} antialiased h-screen overflow-hidden flex`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
