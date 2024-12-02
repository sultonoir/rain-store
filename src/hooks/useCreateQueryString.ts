"use client";
import { useSearchParams } from "next/navigation";

const useCreateQueryString = (
  paramName: string,
  paramValue: string,
): string => {
  const searchParams = useSearchParams();

  // Generate the query string directly
  return buildQueryString(searchParams, paramName, paramValue);
};

// Function that builds the query string based on search parameters
const buildQueryString = (
  searchParams: URLSearchParams | null,
  name: string,
  value: string,
): string => {
  const updatedParams = new URLSearchParams(searchParams?.toString());
  updatedParams.set(name, value);
  return updatedParams.toString();
};

export default useCreateQueryString;
