import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatIDR(value: number): string {
  if (value >= 1000000000) {
    return `Rp ${Math.floor(value / 1000000000)}M` 
  } else if (value >= 1000000) {
      return `Rp ${Math.floor(value / 1000000)}Jt`;
  } else if (value >= 1000) {
      return `Rp ${Math.floor(value / 1000)}K`;
  } else {
      return `Rp ${value}`;
  }
}