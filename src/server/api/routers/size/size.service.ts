import type * as input from "./size.input";
import fs from "fs";
import path from "path";
import sizes from "@/lib/sizes";
import { generateId } from "lucia";
type Sizes = {
  id: string;
  value: string;
};

export async function generateSize(data: Sizes[]) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const fileContent = `// Auto-generated sizes\n const sizes = ${JSON.stringify(data, null, 2)};\n export default sizes;`;

  // Define the path to save the file
  const filePath = path.join(process.cwd(), "src/lib/sizes.ts");

  // Write the file
  fs.writeFileSync(filePath, fileContent);
}

export async function createSize(input: input.CreateSizeInput) {
  const size = {
    id: generateId(10),
    value: input.value,
  };

  sizes.push(size);
  const updateSizes = sizes;

  return await generateSize(updateSizes);
}

export async function removeSize({ id }: input.RemoveSizeInput) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let updatedSizes = sizes;
  // Update the sizes array with the filtered result
  updatedSizes = sizes.filter((item) => item.id !== id);
  sizes.length = 0; // Clear the existing array
  sizes.push(...updatedSizes); // Push the updated sizes into the original array
  updatedSizes = sizes;
  return await generateSize(updatedSizes);
}
