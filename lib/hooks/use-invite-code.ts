import { useCallback } from "react";

// Character set for encoding (Base62: A-Z, a-z, 0-9)
const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const BASE = CHARSET.length;

function encodeUserId(userId: number): string {
  let num = userId;
  let code = "";

  while (num > 0) {
    const remainder = num % BASE;
    code = CHARSET[remainder] + code;
    num = Math.floor(num / BASE);
  }

  // Pad to 6 characters
  return code.padStart(6, "A");
}

function decodeInviteCode(code: string): number {
  if (!/^[A-Za-z0-9]{6}$/.test(code)) {
    return 531; // Invalid format
  }

  let num = 0;
  for (let i = 0; i < code.length; i++) {
    num = num * BASE + CHARSET.indexOf(code[i]);
  }

  return num;
}

export function useInviteCode() {
  const generate = useCallback((userId: number) => encodeUserId(userId), []);
  const decode = useCallback((code: string) => decodeInviteCode(code), []);
  const validate = useCallback((code: string) => /^[A-Za-z0-9]{6}$/.test(code), []);

  return { generate, decode, validate };
}
