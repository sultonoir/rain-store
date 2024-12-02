import { z } from "zod";

const CreateSizeInput = z.object({
  value: z.string(),
});

const RemoveSizeInput = z.object({
  id: z.string(),
});

type CreateSizeInput = z.infer<typeof CreateSizeInput>;
type RemoveSizeInput = z.infer<typeof RemoveSizeInput>;

export { CreateSizeInput, RemoveSizeInput };
