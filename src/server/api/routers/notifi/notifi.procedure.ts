import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as input from "./notifi.input";
import * as service from "./notifi.service";

export const notifiProcedure = createTRPCRouter({
  getCount: protectedProcedure
    .input(input.GetNotifiCount)
    .query(service.getNotifiCount),
  getNotifi: protectedProcedure.input(input.Getnotifi).query(service.getNotifi),
  readALL: protectedProcedure.mutation(async ({ ctx }) =>
    service.readNotifi({ ctx }),
  ),
});
