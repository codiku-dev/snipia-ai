import crypto from "crypto";
const algorithm = "aes-256-cbc";

const key = crypto.scryptSync(
  process.env.KEY as string,
  process.env.SALT as string,
  32
);

export const encryptContent = (content: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(content, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    iv,
    encrypted,
  };
};

export const decryptContent = (encryptedContent: string, iv: Buffer) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedContent, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
