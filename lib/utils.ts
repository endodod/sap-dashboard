import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmt(n: number, decimals = 2): string {
  return (n * 100).toFixed(decimals) + "%";
}

export function fmtNum(n: number): string {
  return n.toLocaleString("en-US");
}
