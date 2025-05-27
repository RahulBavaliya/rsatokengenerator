import { Metadata } from "next";
import TokenGeneratorPage from "@/components/pages/TokenGeneratorPage";

export const metadata: Metadata = {
  title: "RSA Token Generator | Secure Encryption Tool",
  description: "Generate secure RSA encrypted tokens with customizable settings for enhanced security in your applications. Learn how RSA tokens work and generate RSA256 JWT tokens.",
  keywords: [
    "RSA token generator",
    "how does rsa token work",
    "rsa xml key generator",
    "rsa256 jwt generator",
    "what is rsa token app",
    "how to find rsa token code",
    "how to reset rsa token pin",
    "how to generate rsa token",
    "how rsa hard token works",
    "secure token generation",
    "RSA encryption",
    "digital security",
    "cryptography tools"
  ],
  openGraph: {
    title: "RSA Token Generator | Secure Encryption Tool",
    description: "Generate secure RSA encrypted tokens with customizable settings for enhanced security in your applications. Learn how RSA tokens work and generate RSA256 JWT tokens.",
    url: "https://rsa-token-generator.com",
    siteName: "RSA Token Generator",
    images: [
      {
        url: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        width: 1200,
        height: 630,
        alt: "RSA Token Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RSA Token Generator | Secure Encryption Tool",
    description: "Generate secure RSA encrypted tokens with customizable settings for enhanced security in your applications. Learn how RSA tokens work and generate RSA256 JWT tokens.",
    images: ["https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
  },
  alternates: {
    canonical: "https://rsa-token-generator.com",
  },
};

export default function Home() {
  return <TokenGeneratorPage />;
}