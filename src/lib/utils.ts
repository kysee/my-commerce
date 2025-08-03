import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomHexString(bytes: number) {
  const arr = Array.from({ length: bytes }, () => Math.floor(Math.random() * 256));
  return '0x' + arr.map(b => b.toString(16).padStart(2, '0')).join('');
}

