import { TRPCError } from "@trpc/server";
import { type ProtectedTRPCContext, type TRPCContext } from "../../trpc";
import {
  type ImageInput,
  type GetUserInput,
  type UpdateInput,
} from "./user.input";
import { type Prisma } from "@prisma/client";

export const getUser = async (
  ctx: ProtectedTRPCContext,
  { id }: GetUserInput,
) => {
  return await ctx.db.user.findUnique({
    where: {
      id,
    },
  });
};

export const getAlluser = async (ctx: TRPCContext) => {
  return await ctx.db.user.findMany();
};

export async function updateImage({
  ctx,
  input,
}: {
  ctx: ProtectedTRPCContext;
  input: ImageInput;
}) {
  const user = await ctx.db.user.update({
    where: {
      id: ctx.user.id,
    },
    data: {
      image: input.image,
    },
  });
  if (!user) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Error update image" });
  }

  return input.image;
}

export async function Update({
  input,
  ctx,
}: {
  ctx: ProtectedTRPCContext;
  input: UpdateInput;
}) {
  const { image, name, password } = input;

  const conditions: Prisma.UserUpdateInput = {};

  if (image) {
    conditions.image = image;
  }
  if (name) {
    conditions.name = name;
  }

  const userUpdate = await ctx.db.user.update({
    where: {
      id: ctx.user.id,
    },
    data: conditions,
  });

  if (!userUpdate) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Error update user" });
  }

  return userUpdate;
}
