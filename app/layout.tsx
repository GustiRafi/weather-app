import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://weather.gusti.uno/'),
  title: {
    default: 'Weather - Cek Cuaca',
    template: '%s - Weather - Cek Cuaca',
  },
  description: 'Aplikasi cuaca modern dengan informasi cuaca real-time dan prakiraan 4 hari ke depan',
  keywords: 'cuaca, weather, prakiraan cuaca, weather forecast, Indonesia',
  openGraph: {
    type: "website",
    locale: "en_US",
    title: 'Weather  - Cek Cuaca ',
    url: 'https://weather.gusti.uno/',
    description: 'Aplikasi cuaca dengan informasi cuaca real-time',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weather - Cek Cuaca',
    description: 'Aplikasi cuaca dengan informasi cuaca real-time',
    images: ['/og-image.jpg'],
  },
  creator: 'Rafi Gusti',
  authors: [
    {
      name: 'Rafi Gusti',
      url: 'https://gusti.uno/',
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
