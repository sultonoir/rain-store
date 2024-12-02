export function stringToPathname(input: string): string {
  return input
    .toLowerCase() // Mengubah semua huruf menjadi huruf kecil
    .trim() // Menghapus spasi di awal dan akhir
    .replace(/[^a-z0-9\s-]/g, "") // Menghapus karakter non-alfanumerik kecuali spasi dan tanda hubung
    .replace(/\s+/g, "+") // Mengganti spasi dengan tanda +
    .replace(/\++/g, "+"); // Mengganti tanda + ganda dengan satu tanda +
}

export function pathnameToString(pathname: string): string {
  return decodeURIComponent(pathname).replace(/\+/g, " ");
}
