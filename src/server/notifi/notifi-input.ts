import { Notifi as Notifications } from "@prisma/client";
import { z } from "zod";

export const notifiInputSchema = z.object({
  userId: z.string(),
  orderId: z.string(),
});

export type NotifiInput = z.infer<typeof notifiInputSchema>;

export const notifiadminInputSchema = z.object({
  orderId: z.string(),
  totalProduct: z.number(),
  totalPrice: z.number(),
  username: z.string(),
});

export type NotifiadminInput = z.infer<typeof notifiadminInputSchema>;

export type GetNotifiSchema = {
  userId: string;
  cursorId?: string | null;
  limit?: number;
};

export interface NotificationWithRead extends Notifications {
  isRead: boolean;
}

export type Notifi = {
  notifications: NotificationWithRead[];
  nextCursor: string | null;
  unreadCount: number;
};

export const markallNotifiSchema = z.object({
  notifiIds: z.array(z.string()),
});

export type MarkallNotifiSchema = z.infer<typeof markallNotifiSchema>;
