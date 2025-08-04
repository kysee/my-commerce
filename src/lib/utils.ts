import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import os from 'os';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomHexString(bytes: number) {
  const arr = Array.from({ length: bytes }, () => Math.floor(Math.random() * 256));
  return '0x' + arr.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function getServerIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] ?? []) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address; // 예: 192.168.x.x
      }
    }
  }
  return null;
}