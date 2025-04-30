import { PrismaClient } from "@prisma/client";

import { env } from "@/env";
import { logger } from "better-auth";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development"
        ? [
            {
              emit: "event",
              level: "query",
            },
            {
              emit: "stdout",
              level: "error",
            },
            {
              emit: "stdout",
              level: "info",
            },
            {
              emit: "stdout",
              level: "warn",
            },
          ]
        : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

db.$on("query", (e) => {
  logger.info("Query: " + e.query);
  logger.info("Params: " + e.params);
  logger.info("Duration: " + e.duration + "ms");
});
