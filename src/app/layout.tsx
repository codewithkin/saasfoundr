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

// Define the SEO metadata
export const metadata: Metadata = {
  title: "SaaSFoundr - Find Your Perfect Co-Founder Fast",
  description: "Join a community of ambitious entrepreneurs and find the ideal co-founder to bring your startup vision to life.",
  robots: "index, follow",  // Allow search engines to index and follow the links on the page.
  openGraph: {
    title: "SaaSFoundr - Find Your Perfect Co-Founder Fast",
    description:
      "Join a community of ambitious entrepreneurs and find the ideal co-founder to bring your startup vision to life.",
    url: "https://saasfoundr.com",  // Replace with the actual URL
    siteName: "SaaSFoundr",
    images: [
      {
        url: "/path/to/your/og-image.jpg",  // Replace with the path to your OG image
        width: 1200,
        height: 630,
        alt: "SaaSFoundr Co-Founder Matching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image", // You can use 'summary' or 'summary_large_image' depending on your needs
    site: "@saasfoundr",  // Replace with your Twitter handle
    title: "SaaSFoundr - Find Your Perfect Co-Founder Fast",
    description:
      "Join a community of ambitious entrepreneurs and find the ideal co-founder to bring your startup vision to life.",
    images: ["/path/to/your/twitter-image.jpg"],  // Replace with the Twitter image path
  },
  // Add a favicon for your website
  icons: {
    icon: "/favicon.ico", // Link to your favicon
    apple: "/apple-touch-icon.png", // For Apple devices
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Other SEO-related tags will be injected by Next.js automatically */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
