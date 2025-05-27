"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, Copy, Check, Key, Calendar, RefreshCcw } from "lucide-react";
import { useEncryption } from "@/hooks/useEncryption";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface TokenGeneratorProps {
  savedKeys: { name: string; key: string }[];
}

export default function TokenGenerator({ savedKeys }: TokenGeneratorProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [encryptedToken, setEncryptedToken] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedKeyName, setSelectedKeyName] = useState("");
  const [copied, setCopied] = useState(false);
  const [includeCustomData, setIncludeCustomData] = useState(false);
  const [customData, setCustomData] = useState("");
  const [includeExpiry, setIncludeExpiry] = useState(false);
  const [expiryDays, setExpiryDays] = useState("30");
  const [tokenDate, setTokenDate] = useState("");

  const { toast } = useToast();
  const { encryptData } = useEncryption();

  useEffect(() => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yyyy = now.getFullYear();
    setTokenDate(`${dd}${mm}${yyyy}`);
  }, []);

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const handleKeySelect = (value: string) => {
    setSelectedKeyName(value);
    const selectedKey = savedKeys.find((k) => k.name === value);
    if (selectedKey) {
      setPublicKey(selectedKey.key);
    }
  };

  const generateToken = async () => {
    if (!username) {
      toast({
        title: "Username required",
        description: "Please enter a username",
        variant: "destructive",
      });
      return;
    }

    if (!password) {
      toast({
        title: "Password required",
        description: "Please enter a password",
        variant: "destructive",
      });
      return;
    }

    if (!publicKey) {
      toast({
        title: "Public key required",
        description: "Please enter a public key or select one from saved keys",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsGenerating(true);

      let data = `${username}:${password}:${tokenDate}`;
      
      if (includeExpiry) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + parseInt(expiryDays, 10));
        const dd = String(expiryDate.getDate()).padStart(2, "0");
        const mm = String(expiryDate.getMonth() + 1).padStart(2, "0");
        const yyyy = expiryDate.getFullYear();
        data += `:${dd}${mm}${yyyy}`;
      }
      
      if (includeCustomData && customData) {
        data += `:${customData}`;
      }

      const encrypted = await encryptData(data, publicKey);
      setEncryptedToken(encrypted);

      // Track successful token generation
      window.gtag("event", "generate_token", {
        event_category: "Token",
        event_label: "Success",
      });
      
      toast({
        title: "Token generated",
        description: "Your RSA token has been generated successfully",
      });
    } catch (error) {
      // Track failed token generation
      window.gtag("event", "generate_token", {
        event_category: "Token",
        event_label: "Error",
        value: 0,
      });

      toast({
        title: "Encryption failed",
        description: "There was an error generating your token. Check your public key format.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encryptedToken);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Token has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const refreshTokenDate = () => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yyyy = now.getFullYear();
    setTokenDate(`${dd}${mm}${yyyy}`);
    toast({
      title: "Date refreshed",
      description: `Token date updated to ${dd}/${mm}/${yyyy}`,
    });
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Token Information</CardTitle>
          <CardDescription>
            Enter the required information to generate an RSA token
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={generateRandomPassword}
                className="h-8 px-2 text-xs"
              >
                Generate Random
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="date">Token Date</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={refreshTokenDate}
                className="h-8 px-2 text-xs flex items-center gap-1"
              >
                <RefreshCcw className="h-3 w-3" />
                Refresh
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Input
                id="date"
                value={tokenDate}
                onChange={(e) => setTokenDate(e.target.value)}
                placeholder="DDMMYYYY"
                className="font-mono"
              />
              <div className="bg-muted text-muted-foreground px-3 py-2 rounded-md text-sm">
                <Calendar className="h-4 w-4 inline-block mr-2" />
                {tokenDate.slice(0, 2)}/{tokenDate.slice(2, 4)}/{tokenDate.slice(4, 8)}
              </div>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="advanced">
              <AccordionTrigger className="text-sm font-medium">Advanced Options</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="expiry" className="text-sm">Include Expiry Date</Label>
                      <p className="text-xs text-muted-foreground">
                        Add an expiration date to the token
                      </p>
                    </div>
                    <Switch
                      id="expiry"
                      checked={includeExpiry}
                      onCheckedChange={setIncludeExpiry}
                    />
                  </div>
                  
                  {includeExpiry && (
                    <div className="space-y-2">
                      <Label htmlFor="expiryDays" className="text-sm">Expires In (Days)</Label>
                      <Select value={expiryDays} onValueChange={setExpiryDays}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select expiry period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 day</SelectItem>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="365">365 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="customData" className="text-sm">Include Custom Data</Label>
                      <p className="text-xs text-muted-foreground">
                        Add custom information to your token
                      </p>
                    </div>
                    <Switch
                      id="customData"
                      checked={includeCustomData}
                      onCheckedChange={setIncludeCustomData}
                    />
                  </div>
                  
                  {includeCustomData && (
                    <div className="space-y-2">
                      <Label htmlFor="customDataInput" className="text-sm">Custom Data</Label>
                      <Input
                        id="customDataInput"
                        value={customData}
                        onChange={(e) => setCustomData(e.target.value)}
                        placeholder="Enter custom data"
                      />
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Encryption Key</CardTitle>
          <CardDescription>
            Enter a public key or select a saved key to encrypt your token
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {savedKeys.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="savedKey">Select Saved Key</Label>
              <Select value={selectedKeyName} onValueChange={handleKeySelect}>
                <SelectTrigger id="savedKey">
                  <SelectValue placeholder="Choose a saved key" />
                </SelectTrigger>
                <SelectContent>
                  {savedKeys.map((key) => (
                    <SelectItem key={key.name} value={key.name}>
                      {key.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="publicKey">Public Key (PEM Format)</Label>
            <Textarea
              id="publicKey"
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              placeholder="-----BEGIN PUBLIC KEY-----&#10;...&#10;-----END PUBLIC KEY-----"
              className="font-mono text-xs h-32"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="token" className={cn(encryptedToken ? "text-foreground" : "text-muted-foreground")}>
              Encrypted Token
            </Label>
            <div className="relative">
              <Textarea
                id="token"
                value={encryptedToken}
                readOnly
                placeholder="Your encrypted token will appear here"
                className={cn(
                  "font-mono text-xs h-32",
                  encryptedToken ? "text-foreground" : "text-muted-foreground"
                )}
              />
              {encryptedToken && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="sr-only">Copy to clipboard</span>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={generateToken}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Token...
              </>
            ) : (
              <>
                <Key className="mr-2 h-4 w-4" />
                Generate RSA Token
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}