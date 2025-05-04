export function convertSlug(slug: string): string {
  if (slug === "t-shirt") {
    return "t-shirt";
  }

  const words = slug.replace(/-/g, " ").split(" ");
  const capitalized = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return capitalized;
}
