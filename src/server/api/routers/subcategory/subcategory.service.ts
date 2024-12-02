import { generateId } from "lucia";
import fs from "fs";
import path from "path";
import { type ProtectedTRPCContext } from "../../trpc";
import {
  type RemoveSub,
  type GetByCategorySchema,
  type PostSubCategorySchema,
} from "./subcategory.input";
import { TRPCError } from "@trpc/server";
import subcategory from "@/lib/subcategory";

export const createSubCategory = async (
  ctx: ProtectedTRPCContext,
  { category, name }: PostSubCategorySchema,
) => {
  const id = generateId(10);

  return await ctx.db.subcategory.create({
    data: {
      id,
      categoryId: category,
      name,
    },
  });
};

export const listSubcategory = async (ctx: ProtectedTRPCContext) => {
  return await ctx.db.subcategory.findMany();
};

export const getByCategoryId = async (
  ctx: ProtectedTRPCContext,
  { categoryId }: GetByCategorySchema,
) => {
  return await ctx.db.subcategory.findMany({
    where: {
      categoryId,
    },
  });
};

export async function generateSub(ctx: ProtectedTRPCContext) {
  const data = await ctx.db.subcategory.findMany({
    select: {
      id: true,
      name: true,
      categoryId: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const newData = data.flatMap((item) => ({
    ...item,
    category: item.category.name,
  }));

  try {
    const fileContent = `// Auto-generated subcategory\n const subcategory = ${JSON.stringify(newData, null, 2)};\n export default subcategory;`;

    // Define the path to save the file
    const filePath = path.join(process.cwd(), "src/lib/subcategory.ts");

    // Write the file
    fs.writeFileSync(filePath, fileContent);
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "error generateSub",
    });
  }
}

export async function removeSub({
  ctx,
  input,
}: {
  ctx: ProtectedTRPCContext;
  input: RemoveSub;
}) {
  return await ctx.db.subcategory.delete({
    where: {
      id: input.id,
    },
  });
}

export async function uploadsub(ctx: ProtectedTRPCContext) {
  return await ctx.db.subcategory.createManyAndReturn({
    data: subcategory.map((item) => ({
      categoryId: item.categoryId,
      name: item.name,
      id: item.id,
    })),
  });
}
