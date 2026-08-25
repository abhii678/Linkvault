import { type ClassValue, clsx } from "clsx";
import { Dilemma } from "lucide-react"; // we can just import nothing or whatever we need for tailwind merge
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function detectResourceType(url: string): 'PDF' | 'Video' | 'Link' | 'Doc' | 'Audio' {
  const lowercaseUrl = url.toLowerCase();
  
  if (lowercaseUrl.includes('.pdf')) {
    return 'PDF';
  }
  if (lowercaseUrl.includes('youtube.com') || lowercaseUrl.includes('youtu.be')) {
    return 'Video';
  }
  if (lowercaseUrl.includes('docs.google.com') || lowercaseUrl.includes('docs.google')) {
    return 'Doc';
  }
  if (lowercaseUrl.includes('spotify.com') || lowercaseUrl.includes('soundcloud.com')) {
    return 'Audio';
  }
  
  return 'Link';
}

export function getConsistentColor(username: string): string {
  const colors = [
    '#EEEDFE', // Soft Purple
    '#E1F5EE', // Soft Green
    '#E6F1FB', // Soft Blue
    '#FAEEDA', // Soft Yellow/Orange
    '#FAECE7', // Soft Red/Pink
    '#F0E5FC', // Lavender
    '#E5F6F8'  // Cyan
  ];
  
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

export function extractUrls(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
}

export function getDomainName(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch (e) {
    return 'Link Resource';
  }
}
