"use client";

import { useState, useEffect } from "react";

export const useEncryption = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const encryptData = (data: string, publicKey: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!isClient) {
        reject(new Error("Cannot encrypt on server"));
        return;
      }

      // Load JSEncrypt dynamically on client side
      import("jsencrypt").then(({ JSEncrypt }) => {
        try {
          const encrypt = new JSEncrypt();
          encrypt.setPublicKey(publicKey);
          const encrypted = encrypt.encrypt(data);
          
          if (!encrypted) {
            reject(new Error("Encryption failed"));
            return;
          }
          
          resolve(encrypted);
        } catch (error) {
          reject(error);
        }
      }).catch(reject);
    });
  };

  const decryptData = (encryptedData: string, privateKey: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!isClient) {
        reject(new Error("Cannot decrypt on server"));
        return;
      }

      // Load JSEncrypt dynamically on client side
      import("jsencrypt").then(({ JSEncrypt }) => {
        try {
          const decrypt = new JSEncrypt();
          decrypt.setPrivateKey(privateKey);
          const decrypted = decrypt.decrypt(encryptedData);
          
          if (!decrypted) {
            reject(new Error("Decryption failed"));
            return;
          }
          
          resolve(decrypted);
        } catch (error) {
          reject(error);
        }
      }).catch(reject);
    });
  };

  const generateKeyPair = (): Promise<{ publicKey: string; privateKey: string }> => {
    return new Promise((resolve, reject) => {
      if (!isClient) {
        reject(new Error("Cannot generate keys on server"));
        return;
      }

      // Load JSEncrypt dynamically on client side
      import("jsencrypt").then(({ JSEncrypt }) => {
        try {
          const crypt = new JSEncrypt({ default_key_size: "2048" });
          crypt.getKey();
          
          resolve({
            publicKey: crypt.getPublicKey(),
            privateKey: crypt.getPrivateKey(),
          });
        } catch (error) {
          reject(error);
        }
      }).catch(reject);
    });
  };

  return {
    encryptData,
    decryptData,
    generateKeyPair,
  };
};