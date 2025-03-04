import type * as input from "./notifi.input";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { type ProtectedTRPCContext } from "../../trpc";
import { generateId } from "better-auth";

export async function CreateNotifi(input: input.CreateNotifi) {
  const createNotifi = await db.notifi.create({
    data: {
      ...input,
      id: generateId(10),
    },
  });
  if (!createNotifi) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "eror create admin notifications",
    });
  }

  const countNotifi = await db.notifi.count({
    where: {
      AND: [
        {
          OR: [{ userId: input.userId }, { userId: null }],
        },
        {
          notifiRead: {
            none: {
              userId: undefined,
            },
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    userId: input.userId,
    count: countNotifi,
  };
}

export async function NotifitoAdmin(input: input.NotifiToAdmin) {
  const admin = await db.user.findFirst({
    where: {
      role: "admin",
    },
  });
  if (!admin) {
    throw new TRPCError({ code: "NOT_FOUND", message: "admin not found" });
  }
  const createNotifi = await db.notifi.create({
    data: {
      ...input,
      userId: admin.id,
      id: generateId(10),
    },
  });

  if (!createNotifi) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "eror create admin notifications",
    });
  }

  const countNotifi = await db.notifi.count({
    where: {
      AND: [
        {
          OR: [{ userId: admin.id }, { userId: null }],
        },
        {
          notifiRead: {
            none: {
              userId: undefined,
            },
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    userId: admin.id,
    count: countNotifi,
  };
}

export async function getNotifiCount({
  ctx,
}: {
  input: input.GetNotifiCount;
  ctx: ProtectedTRPCContext;
}) {
  return getUnreadNotificationCount(ctx);
}

export async function getNotifi({
  ctx,
  input,
}: {
  input: input.Getnotifi;
  ctx: ProtectedTRPCContext;
}) {
  const { limit, userId, cursor } = input;
  const notifications = await ctx.db.notifi.findMany({
    where: {
      OR: [{ userId: userId }, { userId: null }],
    },
    include: {
      notifiRead: true,
    },
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      createdAt: "desc",
    },
  });

  const nextCursor =
    notifications.length > limit ? notifications[limit]?.id : null;

  const format = notifications
    .map((item) => {
      return {
        ...item,
        notifiRead: item.notifiRead.find((i) => i.notifiId === item.id),
      };
    })
    .slice(0, limit);

  return {
    notifications: format,
    nextCursor,
  };
}

export async function readNotifi({ ctx }: { ctx: ProtectedTRPCContext }) {
  const t = await getExistingReadNotifications(ctx);

  if (t.length >= 0) {
    // Jika sudah ada notifikasi yang dibaca, hanya tambah data baru untuk notifikasi yang belum dibaca
    await markNotificationsAsRead(ctx, t);
  }

  // Menghitung total notifikasi yang belum dibaca oleh pengguna
  const count = await getUnreadNotificationCount(ctx);
  return {
    userId: ctx.user.id,
    count,
  };
}

// Fungsi untuk mengecek apakah notifikasi sudah dibaca oleh pengguna
async function getExistingReadNotifications(ctx: ProtectedTRPCContext) {
  const notifications = await ctx.db.notifi.findMany({
    where: {
      AND: [
        { OR: [{ userId: ctx.user.id }, { userId: null }] },
        {
          notifiRead: {
            none: { userId: undefined },
          },
        },
      ],
    },
    include: {
      notifiRead: true,
    },
  });

  const format = notifications
    .map((item) => {
      const sub = item.notifiRead.find((i) => i.notifiId === item.id);

      return {
        id: item.id,
        sub,
      };
    })
    .filter((item) => item.sub === undefined)
    .map((item) => item.id);

  return format;
}

// Fungsi untuk menandai notifikasi sebagai dibaca
async function markNotificationsAsRead(
  ctx: ProtectedTRPCContext,
  notifiIds: string[],
) {
  const data = notifiIds.map((notifiId) => ({
    id: generateId(10),
    userId: ctx.user.id,
    isRead: true,
    notifiId,
  }));

  await ctx.db.notifiRead.createMany({ data });
}

// Fungsi untuk menghitung jumlah notifikasi yang belum dibaca oleh pengguna
async function getUnreadNotificationCount(ctx: ProtectedTRPCContext) {
  return await ctx.db.notifi.count({
    where: {
      AND: [
        { OR: [{ userId: ctx.user.id }, { userId: null }] },
        {
          notifiRead: {
            none: { userId: undefined },
          },
        },
      ],
    },
    orderBy: { createdAt: "desc" },
  });
}
