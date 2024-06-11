import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY; // Replace with your own secret key

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decrypt = (cipherText) => {
  try {
    const cleanedEncryptedCode = cipherText.replace(/^"(.*)"$/, '$1');
    const bytes = CryptoJS.AES.decrypt(cleanedEncryptedCode, SECRET_KEY);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    
    // Check if decryption was successful
    if (!decryptedText) {
      throw new Error('Invalid encrypted text');
    }

    return decryptedText;
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('failed')
  }
};