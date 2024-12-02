import { generateId } from "lucia";
import fs from "fs";
import path from "path";
import { type TRPCContext, type ProtectedTRPCContext } from "../../trpc";
import {
  type RemoveCategoryInput,
  type PostCategorySchema,
} from "./category.input";
import categories from "@/lib/categories";

export const createCategory = async (
  ctx: ProtectedTRPCContext,
  { name }: PostCategorySchema,
) => {
  const id = generateId(10);
  return await ctx.db.category.create({
    data: {
      name,
      id,
    },
  });
};

export const generateCategory = async (ctx: ProtectedTRPCContext) => {
  const data = await ctx.db.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  // Prepare the content for the TypeScript file
  const fileContent = `// Auto-generated categories\n const categories = ${JSON.stringify(data, null, 2)};\n export default categories;`;

  // Define the path to save the file
  const filePath = path.join(process.cwd(), "src/lib/categories.ts");

  // Write the file
  fs.writeFileSync(filePath, fileContent);
};

export const withSub = async (ctx: TRPCContext) => {
  return ctx.db.category.findMany({
    include: {
      subcategories: true,
    },
  });
};

export const getCategories = async (ctx: ProtectedTRPCContext) => {
  return await ctx.db.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

export const removeById = async ({
  ctx,
  input,
}: {
  ctx: ProtectedTRPCContext;
  input: RemoveCategoryInput;
}) => {
  return await ctx.db.category.delete({
    where: {
      id: input.id,
    },
  });
};

export const uploadCategories = async ({
  ctx,
}: {
  ctx: ProtectedTRPCContext;
}) => {
  return await ctx.db.category.createManyAndReturn({
    data: categories,
  });
};
