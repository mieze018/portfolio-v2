import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind CSS クラスを安全にマージするユーティリティ関数
 * 重複するクラスを適切に解決し、条件付きクラスもサポート
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
