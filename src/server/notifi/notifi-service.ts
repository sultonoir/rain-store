"use server";
import { supabase } from "@/lib/supabase/client";
import { db } from "../db";
import {
  GetNotifiSchema,
  markallNotifiSchema,
  Notifi,
  NotifiadminInput,
  NotifiInput,
} from "./notifi-input";
import { action } from "@/lib/safe-action";

export async function sendAdminNotifiOrder({
  username,
  totalPrice,
  totalProduct,
  orderId,
}: NotifiadminInput) {
  const admin = await db.user.findFirst({
    where: {
      role: "admin",
    },
  });

  if (!admin) {
    return;
  }
  const notifi = await db.notifi.create({
    data: {
      title: "📦 New Order Pending Verification!",
      message: `You have a new order from a ${username}: ${totalProduct} items purchased with a total cost of $${totalPrice.toFixed(2)}. Please verify it as soon as possible to proceed with the order process.`,
      orderId,
      userId: admin.id,
      status: "AdminPaymentConfirmed",
    },
  });
  const payload: Notifi = {
    notifications: [{ ...notifi, isRead: false }],
    nextCursor: null,
    unreadCount: 1,
  };

  supabase.channel(admin.id).send({
    type: "broadcast",
    event: "message",
    payload,
  });
}

export async function sendUserNotifiOrder({ userId, orderId }: NotifiInput) {
  const notifi = await db.notifi.create({
    data: {
      title: "product purchase successful 👍",
      message: `You will receive a receipt within 24 hours after the order is completed.`,
      userId,
      orderId,
      status: "UserPaymentConfirmed",
    },
  });

  const payload: Notifi = {
    notifications: [{ ...notifi, isRead: false }],
    nextCursor: null,
    unreadCount: 1,
  };

  await supabase.channel(userId).send({
    type: "broadcast",
    event: "message",
    payload,
  });
}

/**
 * Mengambil daftar notifikasi untuk user (global dan personal),
 * beserta status apakah sudah dibaca (`isRead`).
 *
 * @param userId ID user yang sedang login
 * @param limit Jumlah notifikasi yang akan diambil
 * @param cursorId ID notifikasi terakhir yang sudah diambil
 * @returns Notifikasi dengan status `isRead`
 */
export async function getUserNotifications({
  userId,
  limit = 10,
  cursorId,
}: GetNotifiSchema) {
  const notifications = await db.notifi.findMany({
    where: {
      OR: [{ userId: null }, { userId }],
    },
    orderBy: { createdAt: "desc" },
    take: limit + 1,
    ...(cursorId && {
      cursor: { id: cursorId },
      skip: 1,
    }),
    include: {
      notifiRead: {
        where: { userId },
        select: { isRead: true },
      },
    },
  });

  const items = notifications.map((notif) => ({
    ...notif,
    isRead: notif.notifiRead[0]?.isRead ?? false,
  }));

  const hasNextPage = items.length > limit;
  const nextCursor = hasNextPage ? items.pop()!.id : null;

  const unreadCount = await db.notifi.count({
    where: {
      OR: [{ userId: null }, { userId }],
      NOT: {
        notifiRead: {
          some: {
            userId,
            isRead: true,
          },
        },
      },
    },
  });

  return {
    notifications: items,
    nextCursor,
    unreadCount,
  };
}

/**
 * Menandai semua notifikasi sebagai sudah dibaca.
 *
 * @param notifiIds IDs notifikasi yang akan ditandai
 * @param userId ID user yang sedang login
 */

export const markAllNotifications = action
  .metadata({ actionName: "markAllNotifications" })
  .schema(markallNotifiSchema)
  .action(async ({ parsedInput: { notifiIds }, ctx: { user } }) => {
    const userId = user.id;
    const upserts = notifiIds.map((notifiId) =>
      db.notifiRead.upsert({
        where: { userNotifiRead: { notifiId, userId } },
        update: { isRead: true },
        create: { notifiId, userId, isRead: true },
      }),
    );

    await db.$transaction(upserts);
    const notifi = await getUserNotifications({
      userId,
      limit: notifiIds.length,
    });
    await supabase.channel(userId).send({
      type: "broadcast",
      event: "edit",
      payload: notifi,
    });
  });
