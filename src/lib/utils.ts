import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomDecimal(): number {
  // Menghasilkan angka acak antara 1 dan 5, dengan 1 angka desimal setelah titik
  const randomDecimal = Math.random() * 3 + 2; // Angka acak antara 1 dan 5
  return Math.round(randomDecimal * 10) / 10; // Membulatkan ke satu angka desimal
}

export function generateRandomSelling(): number {
  return Math.floor(Math.random() * 1000) + 1;
}

export const getExceptionType = (error: unknown) => {
  const UnknownException = {
    type: "UnknownException",
    status: 500,
    message: "An unknown error occurred",
  };

  if (!error) return UnknownException;

  if ((error as Record<string, unknown>).name === "DatabaseError") {
    return {
      type: "DatabaseException",
      status: 400,
      message: "Duplicate key entry",
    };
  }

  return UnknownException;
};

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  },
) {
  return new Intl.DateTimeFormat("en-US", {
    ...options,
  }).format(new Date(date));
}

export function formatPrice(
  price: number | string,
  options: Intl.NumberFormatOptions = {},
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: options.currency ?? "USD",
    notation: options.notation ?? "compact",
    ...options,
  }).format(Number(price));
}

export function extractUsername(email: string) {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    return email.substring(0, atIndex);
  } else {
    return email; // or throw an error, depending on your requirements
  }
}

interface PropsCall {
  price: number;
  discount: number | null;
}

export const calculateTotalPrice = ({ price, discount }: PropsCall) => {
  let discountedPrice = price;
  if (discount && discount > 0) {
    const discountAmount = (price * discount) / 100;
    discountedPrice = price - discountAmount;
  }
  discountedPrice = parseFloat(discountedPrice.toFixed(2));
  return discountedPrice;
};

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.slice(0, 16);
}

export function formatExpiryDate(value: string): string {
  const digits = value.replace(/\D/g, "");

  // Jika tidak ada digit, kembalikan string kosong
  if (digits.length === 0) {
    return "";
  }

  // Jika panjang digit 1 atau 2, kembalikan langsung
  if (digits.length < 3) {
    return digits; // Hanya mengembalikan MM
  }

  // Format sebagai MM/YY jika lebih dari 2 digit
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}
