import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://rsa-token-generator.com"),
  title: {
    default: "RSA Token Generator",
    template: "%s | RSA Token Generator",
  },
  description: "Generate secure RSA encrypted tokens with ease. Learn how RSA tokens work and create secure tokens for your applications.",
  keywords: [
    "RSA token generator",
    "how does rsa token work",
    "rsa xml key generator",
    "rsa256 jwt generator",
    "what is rsa token app",
    "how to find rsa token code",
    "how to reset rsa token pin",
    "how to generate rsa token",
    "how rsa hard token works"
  ],
  authors: [{ name: "RSA Token Generator" }],
  creator: "RSA Token Generator",
  publisher: "RSA Token Generator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}