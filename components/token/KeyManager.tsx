"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Key, User, Lock, Calendar } from "lucide-react";
import { useEncryption } from "@/hooks/useEncryption";

interface KeyManagerProps {
  savedKeys: { name: string; key: string; username: string; password: string }[];
  onSaveKey: (name: string, key: string, username: string, password: string) => void;
}

export default function KeyManager({ savedKeys, onSaveKey }: KeyManagerProps) {
  const [keyName, setKeyName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [creationDate, setCreationDate] = useState(() => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  });

  const { toast } = useToast();
  const { generateKeyPair } = useEncryption();

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const handleGenerateKeys = () => {
    if (!keyName) {
      toast({
        title: "Key name required",
        description: "Please enter a name for your key pair",
        variant: "destructive",
      });
      return;
    }

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

    setIsGenerating(true);
    
    generateKeyPair()
      .then(({ publicKey, privateKey }) => {
        setPublicKey(publicKey);
        setPrivateKey(privateKey);
        
        window.gtag("event", "generate_keys", {
          event_category: "Keys",
          event_label: "Success",
        });
        
        toast({
          title: "Keys generated",
          description: "RSA key pair has been generated successfully",
        });
      })
      .catch((error) => {
        window.gtag("event", "generate_keys", {
          event_category: "Keys",
          event_label: "Error",
          value: 0,
        });

        toast({
          title: "Key generation failed",
          description: "There was an error generating the key pair",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  const handleSaveKey = () => {
    if (!keyName || !publicKey) {
      toast({
        title: "Missing information",
        description: "Please generate a key pair first",
        variant: "destructive",
      });
      return;
    }

    onSaveKey(keyName, publicKey, username, password);
    toast({
      title: "Key saved",
      description: "Your key pair has been saved successfully",
    });

    // Reset form
    setKeyName("");
    setUsername("");
    setPassword("");
    setPublicKey("");
    setPrivateKey("");
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Generate New Key Pair</CardTitle>
          <CardDescription>
            Create a new RSA key pair for token encryption
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="keyName">Key Name</Label>
            <Input
              id="keyName"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="Enter a name for this key pair"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="pl-8"
              />
            </div>
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
            <div className="relative">
              <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="creationDate">Creation Date</Label>
            <div className="relative">
              <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="creationDate"
                type="date"
                value={creationDate}
                onChange={(e) => setCreationDate(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="publicKey">Public Key</Label>
            <Textarea
              id="publicKey"
              value={publicKey}
              readOnly
              placeholder="Generated public key will appear here"
              className="font-mono text-xs h-32"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="privateKey">Private Key</Label>
            <Textarea
              id="privateKey"
              value={privateKey}
              readOnly
              placeholder="Generated private key will appear here"
              className="font-mono text-xs h-32"
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button
            onClick={handleGenerateKeys}
            disabled={isGenerating || !keyName || !username || !password}
            className="flex-1"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Key className="mr-2 h-4 w-4" />
                Generate Keys
              </>
            )}
          </Button>
          <Button
            onClick={handleSaveKey}
            disabled={!publicKey || !keyName || !username || !password}
            variant="secondary"
            className="flex-1"
          >
            Save Key
          </Button>
        </CardFooter>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Saved Keys</CardTitle>
          <CardDescription>
            Your saved public keys for token encryption
          </CardDescription>
        </CardHeader>
        <CardContent>
          {savedKeys.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Key className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No saved keys yet</p>
              <p className="text-sm">Generate a new key pair to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedKeys.map((key, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{key.name}</CardTitle>
                    {key.username && (
                      <CardDescription className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        {key.username}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={key.key}
                      readOnly
                      className="font-mono text-xs h-24"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}