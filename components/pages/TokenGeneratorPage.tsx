"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenGenerator from "@/components/token/TokenGenerator";
import TokenVerifier from "@/components/token/TokenVerifier";
import KeyManager from "@/components/token/KeyManager";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";

interface SavedKey {
  name: string;
  key: string;
  username: string;
  password: string;
}

export default function TokenGeneratorPage() {
  const [savedKeys, setSavedKeys] = useState<SavedKey[]>([]);

  const handleSaveKey = (name: string, key: string, username: string, password: string) => {
    setSavedKeys((prev) => [...prev, { name, key, username, password }]);
  };

  return (
    <div className="w-full">
      <Hero />
      
      <div id="tool" className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20">
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-8">
            <TabsTrigger value="generate">Generate Token</TabsTrigger>
            <TabsTrigger value="verify">Verify Token</TabsTrigger>
            <TabsTrigger value="keys">Manage Keys</TabsTrigger>
          </TabsList>
          <TabsContent value="generate">
            <TokenGenerator savedKeys={savedKeys} />
          </TabsContent>
          <TabsContent value="verify">
            <TokenVerifier />
          </TabsContent>
          <TabsContent value="keys">
            <KeyManager savedKeys={savedKeys} onSaveKey={handleSaveKey} />
          </TabsContent>
        </Tabs>
      </div>

      <div id="features" className="w-full">
        <Features />
      </div>

      <div id="how-it-works" className="w-full">
        <HowItWorks />
      </div>

      <div id="faq" className="w-full">
        <FAQ />
      </div>
    </div>
  );
}