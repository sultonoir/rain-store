import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { ButtonBack } from "@/components/templates/button/button-back";

export default function NotFound() {
  return (
    <section>
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center px-6 py-12">
        <div className="mx-auto flex max-w-sm flex-col items-center justify-center text-center">
          <p className="rounded-full bg-blue-50 p-3 text-sm font-medium dark:bg-gray-800">
            <AlertTriangle className="size-6" />
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            The page you are looking for doesn&apos;t exist.
          </p>

          <div className="group mt-6 flex w-full shrink-0 items-center justify-center gap-x-3 sm:w-auto">
            <ButtonBack />
            <Link href="/" className={buttonVariants({ variant: "default" })}>
              Take me home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
