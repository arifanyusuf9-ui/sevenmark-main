import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getApiUrl(path: string) {
  const isLocal = (window.location.port === "8080" || window.location.port === "8081") && window.location.hostname === "localhost";
  const baseUrl = isLocal ? "http://localhost:8888" : "";
  return `${baseUrl}/api${path}`;
}
