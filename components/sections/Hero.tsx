import { KeyRound, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="w-full relative py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-small-black/[0.05] -z-10 dark:bg-grid-small-white/[0.05]" />
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <KeyRound className="mr-1 h-3.5 w-3.5" />
            <span>Secure RSA Encryption</span>
          </div>
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-6 max-w-4xl">
            Generate Secure RSA Tokens for Your Applications
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10">
            Create, manage, and verify encrypted tokens with our powerful RSA Token Generator. 
            Built for developers and security professionals.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mb-16">
            <Button size="lg" asChild>
              <Link href="#tool">
                Generate Token
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-it-works">
                Learn How It Works
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <ShieldCheck className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">Strong Encryption</h3>
              <p className="text-muted-foreground">
                Industry-standard RSA encryption for maximum security and protection.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <svg className="h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              <h3 className="text-lg font-medium mb-2">Easy Integration</h3>
              <p className="text-muted-foreground">
                Simple to integrate with your existing applications and systems.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <svg className="h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
              <h3 className="text-lg font-medium mb-2">User-Friendly</h3>
              <p className="text-muted-foreground">
                Intuitive interface designed for both technical and non-technical users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}