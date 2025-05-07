export function convertSlug(slug: string): string {
  const words = slug.split("-");

  const result: string[] = [];
  for (let i = 0; i < words.length; i++) {
    const current = words[i].toLowerCase();
    const next = words[i + 1]?.toLowerCase();

    if (current === "t" && next === "shirt") {
      result.push("T-Shirt");
      i++; // skip next word because it's part of "t-shirt"
    } else if (current === "t-shirt") {
      result.push("T-Shirt");
    } else {
      result.push(current.charAt(0).toUpperCase() + current.slice(1));
    }
  }

  return result.join(" ");
}
