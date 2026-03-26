import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAutomationLevelColor(level: string): string {
  switch (level) {
    case "Automatisable":
      return "text-green-600 bg-green-50 border-green-200";
    case "Semi-automatisable":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "Non automatisable":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

export function getAutomationLevelLabel(level: string): string {
  switch (level) {
    case "Automatisable":
      return "Automatisable";
    case "Semi-automatisable":
      return "Semi-automatisable";
    case "Non automatisable":
      return "Non automatisable";
    default:
      return level;
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "high":
      return "text-red-600 bg-red-50";
    case "medium":
      return "text-yellow-600 bg-yellow-50";
    case "low":
      return "text-blue-600 bg-blue-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
}