import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const JetBrains = JetBrains_Mono({
  variable: "--jetBrains-mono",
  subsets: ["latin"],
});

const APP_NAME = "Ryder";
const APP_DEFAULT_TITLE = "RyderTracker";
const APP_TITLE_TEMPLATE = "%s - Ryder";
const APP_DESCRIPTION = "Delivery and budget tracker";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${JetBrains.variable} h-full antialiased`}
    >
      <head>
        <meta name="RyderTracker" content="Ryder" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
