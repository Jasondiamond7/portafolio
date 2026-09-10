import { clsx, type ClassValue } from 'clsx'

/** Merge conditional class names. Keep it tiny; add tailwind-merge only if conflicts appear. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}
