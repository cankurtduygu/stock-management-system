import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

//cn yapisi ShadCN de iki class yapisini birlestirmek icin kullaniliyor.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
