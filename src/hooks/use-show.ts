import { usePathname } from "next/navigation";

export const useShow = () => {
  const blacklist = ["/", "/payment", "/profile"];
  const pathname = usePathname();

  // Fungsi untuk mengecek apakah path sesuai dengan pola tertentu
  const isDynamicMatch = (path: string, pattern: string) => {
    // Membangun regex dari pattern
    // Mengganti :parameter dengan \w+ untuk mencocokkan parameter alphanumeric
    const regexPattern = pattern
      .replace(/:\w+/g, "\\w+") // Mengganti :parameter dengan \w+ untuk alphanumeric
      .replace(/\*/g, ".*"); // Mengganti * dengan .*, agar cocok dengan path apapun setelah parameter

    const regex = new RegExp(`^${regexPattern}(/.*)?$`);
    return regex.test(path);
  };

  // Mengecek apakah pathname ada dalam daftar blacklist atau cocok dengan pola dinamis
  return (
    blacklist.includes(pathname ?? "") ||
    isDynamicMatch(pathname ?? "", "/profile/:path*") ||
    isDynamicMatch(pathname ?? "", "/product/:path*")
  );
};
