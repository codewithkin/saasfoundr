import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { NextUIClientProvider } from "@/providers/nextui-provider";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

// Define the SEO metadata
export const metadata: Metadata = {
  title: "SaaSFoundr - Find Your Perfect Co-Founder Fast",
  description:
    "Join a community of ambitious entrepreneurs and find the ideal co-founder to bring your startup vision to life.",
  robots: "index, follow", // Allow search engines to index and follow the links on the page.
  openGraph: {
    title: "SaaSFoundr - Find Your Perfect Co-Founder Fast",
    description:
      "Join a community of ambitious entrepreneurs and find the ideal co-founder to bring your startup vision to life.",
    url: "https://saasfoundr.com", // Replace with the actual URL
    siteName: "SaaSFoundr",
    images: [
      {
        url: "/og/main.png", // Replace with the path to your OG image
        width: 1200,
        height: 630,
        alt: "SaaSFoundr Co-Founder Matching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image", // You can use 'summary' or 'summary_large_image' depending on your needs
    site: "@saasfoundr", // Replace with your Twitter handle
    title: "SaaSFoundr - Find Your Perfect Co-Founder Fast",
    description:
      "Join a community of ambitious entrepreneurs and find the ideal co-founder to bring your startup vision to life.",
    images: ["/og/summary_large_image.png"], // Replace with the Twitter image path
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any"
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      }
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png"
    },
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  },
  manifest: "/site.webmanifest"
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-poppins md:min-h-screen md:overflow-y-hidden md:max-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          suppressHydrationWarning
        >
          <QueryProvider>
            <NextUIClientProvider>
              {children}
            </NextUIClientProvider>
            <Toaster richColors visibleToasts={20} />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
