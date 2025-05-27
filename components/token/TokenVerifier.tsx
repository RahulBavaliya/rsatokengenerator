"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileKey, Loader2, ShieldCheck, AlertTriangle, AlertCircle, CalendarClock } from "lucide-react";
import { useEncryption } from "@/hooks/useEncryption";

export default function TokenVerifier() {
  const [privateKey, setPrivateKey] = useState("");
  const [encryptedToken, setEncryptedToken] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
    data?: {
      username: string;
      creationDate: string;
      expiryDate?: string;
      customData?: string;
      isExpired?: boolean;
    };
  } | null>(null);

  const { toast } = useToast();
  const { decryptData } = useEncryption();

  const verifyToken = async () => {
    if (!privateKey) {
      toast({
        title: "Private key required",
        description: "Please enter a private key",
        variant: "destructive",
      });
      return;
    }

    if (!encryptedToken) {
      toast({
        title: "Token required",
        description: "Please enter an encrypted token",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsVerifying(true);
      
      const decrypted = await decryptData(encryptedToken, privateKey);
      const parts = decrypted.split(":");
      
      if (parts.length < 3) {
        setVerificationResult({
          success: false,
          message: "Invalid token format",
        });
        return;
      }

      const [username, password, creationDateStr, ...rest] = parts;
      
      // Format creation date
      const creationDate = `${creationDateStr.slice(0, 2)}/${creationDateStr.slice(2, 4)}/${creationDateStr.slice(4, 8)}`;
      
      // Check for expiry date
      let expiryDate;
      let isExpired = false;
      let customData;
      
      if (rest.length > 0) {
        // Check if the first rest item is a date (expiry)
        const potentialDateStr = rest[0];
        if (potentialDateStr.length === 8 && !isNaN(Number(potentialDateStr))) {
          expiryDate = `${potentialDateStr.slice(0, 2)}/${potentialDateStr.slice(2, 4)}/${potentialDateStr.slice(4, 8)}`;
          
          // Check if token is expired
          const today = new Date();
          const expiryDateObj = new Date(
            parseInt(potentialDateStr.slice(4, 8)),
            parseInt(potentialDateStr.slice(2, 4)) - 1,
            parseInt(potentialDateStr.slice(0, 2))
          );
          
          isExpired = today > expiryDateObj;
          
          // If there are more parts, it's custom data
          if (rest.length > 1) {
            customData = rest.slice(1).join(":");
          }
        } else {
          // If not a date, it's custom data
          customData = rest.join(":");
        }
      }

      setVerificationResult({
        success: true,
        message: "Token verified successfully",
        data: {
          username,
          creationDate,
          ...(expiryDate && { expiryDate }),
          ...(customData && { customData }),
          ...(expiryDate && { isExpired }),
        },
      });

      // Track successful token verification
      window.gtag("event", "verify_token", {
        event_category: "Token",
        event_label: "Success",
      });
      
      toast({
        title: "Token verification",
        description: "Token has been verified successfully",
      });
    } catch (error) {
      // Track failed token verification
      window.gtag("event", "verify_token", {
        event_category: "Token",
        event_label: "Error",
        value: 0,
      });

      setVerificationResult({
        success: false,
        message: "Failed to decrypt token. Check that you're using the correct private key."
      });
      
      toast({
        title: "Verification failed",
        description: "There was an error verifying your token",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Verify RSA Token</CardTitle>
          <CardDescription>
            Enter the private key and token to verify
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="privateKey">Private Key (PEM Format)</Label>
            <Textarea
              id="privateKey"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="-----BEGIN PRIVATE KEY-----&#10;...&#10;-----END PRIVATE KEY-----"
              className="font-mono text-xs h-32"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="encryptedToken">Encrypted Token</Label>
            <Textarea
              id="encryptedToken"
              value={encryptedToken}
              onChange={(e) => setEncryptedToken(e.target.value)}
              placeholder="Paste the encrypted token here"
              className="font-mono text-xs h-32"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={verifyToken}
            disabled={isVerifying}
            className="w-full"
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying Token...
              </>
            ) : (
              <>
                <ShieldCheck className="mr-2 h-4 w-4" />
                Verify Token
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Verification Results</CardTitle>
          <CardDescription>
            Token verification details will appear here
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {verificationResult === null ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <FileKey className="h-12 w-12 mb-4" />
              <p>No verification results yet</p>
              <p className="text-sm">Enter a token and private key to verify</p>
            </div>
          ) : verificationResult.success ? (
            <div className="space-y-4">
              <Alert variant="default" className="border-green-500 bg-green-50 dark:bg-green-950/20">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <AlertTitle className="text-green-700 dark:text-green-400">Token Verified</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-400">
                  This token has been successfully decrypted and verified.
                </AlertDescription>
              </Alert>

              <div className="space-y-4 pt-2">
                <div>
                  <p className="text-sm font-medium">Username:</p>
                  <p className="text-sm bg-muted p-2 rounded mt-1">{verificationResult.data?.username}</p>
                </div>

                <div>
                  <p className="text-sm font-medium flex items-center">
                    <CalendarClock className="h-4 w-4 mr-1" /> Creation Date:
                  </p>
                  <p className="text-sm bg-muted p-2 rounded mt-1">{verificationResult.data?.creationDate}</p>
                </div>

                {verificationResult.data?.expiryDate && (
                  <div>
                    <p className="text-sm font-medium flex items-center">
                      <CalendarClock className="h-4 w-4 mr-1" /> Expiry Date:
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm bg-muted p-2 rounded flex-1">{verificationResult.data.expiryDate}</p>
                      {verificationResult.data.isExpired ? (
                        <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs px-2 py-1 rounded-full flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" /> Expired
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-1 rounded-full flex items-center">
                          <ShieldCheck className="h-3 w-3 mr-1" /> Valid
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {verificationResult.data?.customData && (
                  <div>
                    <p className="text-sm font-medium">Custom Data:</p>
                    <p className="text-sm bg-muted p-2 rounded mt-1">{verificationResult.data.customData}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Verification Failed</AlertTitle>
              <AlertDescription>
                {verificationResult.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}