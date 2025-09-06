import type { Metadata } from "next";
import { Poppins, Amiri } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const amiri = Amiri({
  variable: "--font-amiri", 
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "UKM Madani - Mahasiswa Peradaban Islam",
  description: "Unit Kegiatan Mahasiswa Madani Institut Teknologi Sumatera - Membangun generasi Muslim yang berkarakter, berilmu, dan berperadaban melalui pendidikan, dakwah, dan pemberdayaan masyarakat.",
  keywords: "UKM Madani, ITERA, Mahasiswa Islam, Peradaban Islam, Organisasi Mahasiswa, Dakwah",
  authors: [{ name: "UKM Madani ITERA" }],
  openGraph: {
    title: "UKM Madani - Mahasiswa Peradaban Islam",
    description: "Membangun generasi Muslim yang berkarakter, berilmu, dan berperadaban",
    type: "website",
    locale: "id_ID",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/images/logo-madani.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo-madani.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/images/logo-madani.png", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body
        className={`${poppins.variable} ${amiri.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
