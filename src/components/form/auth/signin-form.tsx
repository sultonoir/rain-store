"use client";

import { ArrowLeft, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ErrorToast from "@/components/ui/error-toast";

export function SigninForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") ?? "/";
  const [isPending, setIsPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    await authClient.signIn.magicLink(
      {
        email,
        callbackURL,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );

    return toast.success(
      "magic link successfully sent, check your inbox or spam",
    );
  };

  const signIn = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL,
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onResponse: () => {
          setPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const handleGuestSignin = async () => {
    await authClient.signIn.email(
      {
        email: process.env.NEXT_PUBLIC_EMAIL_GUEST!,
        password: process.env.NEXT_PUBLIC_PASSWORD_GUEST!,
        callbackURL,
      },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.custom((d) => <ErrorToast t={d} name={ctx.error.message} />);
        },
      },
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Link
        href={callbackURL}
        title="back to home"
        aria-label="back to home"
        className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
      >
        <ArrowLeft />
      </Link>
      <div className="grid gap-4 sm:grid-cols-1">
        <Button
          variant="outline"
          type="button"
          onClick={signIn}
          disabled={pending}
          className="w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Continue with Google
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={handleGuestSignin}
          disabled={isPending}
          loading={isPending}
          startContent={<UserIcon />}
          className="w-full"
        >
          Continue with Guest
        </Button>
      </div>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-2">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex items-center justify-center rounded-md">
              <Image
                src="/logo.png"
                alt="logo"
                width={50}
                height={50}
                priority
              />
            </div>
            <span className="sr-only">Rizal Store.</span>
          </a>
          <h1 className="text-xl font-bold">Welcome to Rizal Store.</h1>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            Login
          </Button>
        </div>
      </form>
      <div className="text-muted-foreground hover:[&_a]:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
