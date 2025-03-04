"use client";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "../button/loading-button";
import { useSession } from "@/lib/auth-client";

export default function DetailProfile() {
  const { data } = useSession();
  const user = data?.user
  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-bold ~text-lg/3xl">Change biodata</h2>
      <div className="flex items-center gap-4">
        <div className="min-w-[50px] text-muted-foreground">Name :</div>
        <p className="capitalize">{user?.name}</p>
        <DialogEditname />
      </div>
      <div className="flex gap-4">
        <div className="min-w-[50px] text-muted-foreground">Email :</div>
        {user && (
          <p>
            {user.email.at(0)?.toUpperCase() +
              user.email.slice(1).toLowerCase()}
          </p>
        )}
        <Badge className="rounded-lg bg-primary/20 text-primary hover:bg-primary/30">
          Verified
        </Badge>
      </div>
    </div>
  );
}

function DialogEditname() {
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { mutate, isPending } = api.user.update.useMutation({
    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          Change
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="text-base">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <LoadingButton
            loading={isPending}
            disabled={isPending}
            type="submit"
            className="w-full"
            onClick={() => mutate({ name })}
          >
            Save changes
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
