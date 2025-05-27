import { Steps } from "@/components/ui/steps";

export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-16 bg-muted/50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Understanding the RSA token generation and verification process.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Steps
            steps={[
              {
                title: "Generate or Import Keys",
                description:
                  "Create a new RSA key pair or import an existing public key for encryption.",
              },
              {
                title: "Enter Token Information",
                description:
                  "Provide the username, password, and any additional information you want to include in your token.",
              },
              {
                title: "Configure Advanced Options",
                description:
                  "Optionally set an expiration date or add custom data to your token for additional security and functionality.",
              },
              {
                title: "Generate Encrypted Token",
                description:
                  "The system will encrypt your data using the provided public key, creating a secure RSA token.",
              },
              {
                title: "Use or Verify the Token",
                description:
                  "Use the encrypted token in your application or verify it using the corresponding private key.",
              },
            ]}
          />
        </div>

        <div className="mt-16 bg-card border rounded-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-medium mb-4">Technical Details</h3>
          <div className="space-y-4 text-sm">
            <p>
              RSA (Rivest-Shamir-Adleman) is an asymmetric encryption algorithm that uses a pair of keys:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Public Key:</strong> Used to encrypt data. Can be freely shared.</li>
              <li><strong>Private Key:</strong> Used to decrypt data. Must be kept secret.</li>
            </ul>
            <p>
              Our token generator creates a structured data string containing the username, password, 
              current date, and optional fields like expiry date and custom data. This string is then 
              encrypted using the public key.
            </p>
            <p>
              To verify a token, the recipient uses the private key to decrypt the token, revealing 
              the original data. This allows for secure authentication and data transfer between systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}