import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from './ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)',  color: '#09090b' },
  ],
};

export const metadata = {
  title: 'Gacha Hub | Últimas novedades',
  description: 'Tu fuente principal de actualizaciones y eventos de juegos gacha.',
  manifest: '/manifest.json',
  formatDetection: { telephone: false },
  appleWebApp: {
    capable: true,
    title: 'Gacha Hub',
    statusBarStyle: 'default',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth suppressHydrationWarning">
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      {/*
       * antialiased: suavizado de fuentes
       * overflow-hidden: evita scroll en body — el scroll está en el contenedor interno
       * flex: necesario para que ClientLayout ocupe todo el alto disponible
       *
       * ⚠️ Se eliminó h-screen (= 100vh fijo) que causaba el corte en PWA standalone.
       *    El alto ahora viene de globals.css → html/body con dvh + -webkit-fill-available.
       */}
      <body className={`${inter.className} antialiased overflow-hidden flex min-h-dvh`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
