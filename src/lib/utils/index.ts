import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatVisiblePhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return "";
  let phone = phoneNumber?.toString();
  if (phone?.length !== 10) return phoneNumber;
  return phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
};

export const convertPhoneNumber = (phone: string, countryCode = "+84") => {
  if (phone.startsWith("0")) {
    return countryCode + phone.substring(1);
  }

  return countryCode + phone;
};

export const getInitialsUserName = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const firestoreTimestampToDate = (timestamp: {
  _seconds: number;
  _nanoseconds: number;
}) => new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6);
