import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const SITE_URL = "https://mundopilates.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mundo Pilates — Clases de Pilates en Buenos Aires",
    template: "%s | Mundo Pilates",
  },
  description:
    "Estudio boutique de Pilates Reformer y Mat en Buenos Aires. Clases reducidas, atención personalizada para todos los niveles. ¡Reservá tu turno hoy!",
  keywords: [
    "pilates",
    "pilates reformer",
    "pilates mat",
    "clases de pilates",
    "Buenos Aires",
    "estudio pilates",
    "pilates boutique",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Mundo Pilates — Clases de Pilates en Buenos Aires",
    description:
      "Estudio boutique de Pilates Reformer y Mat. Clases reducidas, atención personalizada, todos los niveles. ¡Reservá tu turno hoy!",
    url: SITE_URL,
    siteName: "Mundo Pilates",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mundo Pilates — Estudio boutique en Buenos Aires",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mundo Pilates — Clases de Pilates en Buenos Aires",
    description:
      "Estudio boutique de Pilates Reformer y Mat. Clases reducidas, atención personalizada. ¡Reservá tu turno!",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-sage-600 focus:text-white focus:rounded focus:font-medium"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
