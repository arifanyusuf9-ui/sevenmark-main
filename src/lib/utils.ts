import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getApiUrl(path: string) {
  const isLocal8080 = window.location.port === "8080" && window.location.hostname === "localhost";
  const baseUrl = isLocal8080 ? "http://localhost:8888" : "";
  return `${baseUrl}/api${path}`;
}
