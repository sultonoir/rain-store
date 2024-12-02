import { type NotificationStatus } from "@prisma/client";
import { z } from "zod";

export const GetNotifiCount = z.object({
  userId: z.string(),
});

export type GetNotifiCount = z.infer<typeof GetNotifiCount>;

export const Getnotifi = z.object({
  userId: z.string(),
  cursor: z.string().optional(),
  limit: z.number(),
});

export type Getnotifi = z.infer<typeof Getnotifi>;

export type CreateNotifi = {
  userId: string;
  checkoutId?: string;
  link?: string;
  message: string;
  issuerId?: string;
  status: NotificationStatus;
};

export type NotifiToAdmin = {
  checkoutId?: string;
  link?: string;
  message: string;
  issuerId?: string;
  status: NotificationStatus;
};

export const CreateNotifiRead = z.object({
  notifiIds: z.array(z.string()),
});

export type CreateNotifiRead = z.infer<typeof CreateNotifiRead>;
