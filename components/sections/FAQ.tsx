import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Find answers to common questions about RSA tokens and our generator.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is an RSA token?</AccordionTrigger>
              <AccordionContent>
                An RSA token is a piece of data that has been encrypted using RSA cryptography. 
                RSA is an asymmetric encryption algorithm that uses a pair of keys (public and private) 
                for secure data transmission. The token typically contains authentication or authorization 
                information that can only be decrypted and read by someone who possesses the corresponding 
                private key.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How secure is RSA encryption?</AccordionTrigger>
              <AccordionContent>
                RSA is considered very secure when implemented correctly with sufficiently large key sizes. 
                Our generator uses 2048-bit keys by default, which is currently considered secure against 
                brute-force attacks with today's computing technology. The security of RSA is based on the 
                practical difficulty of factoring the product of two large prime numbers.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Is my data safe when using this tool?</AccordionTrigger>
              <AccordionContent>
                Yes, all encryption and decryption operations happen entirely in your browser. 
                We never send your private keys or unencrypted data to any server. The tool uses 
                client-side JavaScript to perform all cryptographic operations, ensuring your sensitive 
                data never leaves your device.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>What are the size limitations for RSA encryption?</AccordionTrigger>
              <AccordionContent>
                RSA encryption has size limitations based on the key size. With 2048-bit RSA keys, 
                you can encrypt messages up to approximately 245 bytes. If you need to encrypt larger 
                amounts of data, it's common practice to use RSA to encrypt a symmetric key (like AES), 
                which is then used to encrypt the actual data.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I use these tokens for authentication in my application?</AccordionTrigger>
              <AccordionContent>
                Yes, RSA tokens can be used for authentication purposes. The token can contain user 
                credentials and other authentication information. The server can verify the authenticity 
                of the token by decrypting it with the private key. However, for web applications, 
                you might also want to consider using established standards like JWT (JSON Web Tokens) 
                which are specifically designed for authentication and authorization.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>How do I integrate these tokens with my application?</AccordionTrigger>
              <AccordionContent>
                To integrate RSA tokens with your application, you typically need to:
                <ol className="list-decimal ml-5 mt-2 space-y-1">
                  <li>Generate a key pair and store the private key securely on your server</li>
                  <li>Use the public key in this tool or your client application to generate tokens</li>
                  <li>Send the encrypted token to your server with API requests</li>
                  <li>On the server, decrypt the token using the private key</li>
                  <li>Validate the decrypted information and process the request accordingly</li>
                </ol>
                Most programming languages have libraries for RSA encryption/decryption, making it 
                relatively straightforward to implement on both client and server sides.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}