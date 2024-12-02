import {
  createTRPCRouter,
  publicProcedure,
} from "../../trpc";
import * as input from "./payment.input";
import * as service from "./payment.service";

export const paymentProcedure = createTRPCRouter({
  create: publicProcedure
    .input(input.CreatePayment)
    .mutation(service.createPayment),
});
