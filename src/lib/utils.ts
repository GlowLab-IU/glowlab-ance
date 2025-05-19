import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const decodeBase64 = (base64String: string) =>
  `data:image/jpeg;base64,${base64String}`;
