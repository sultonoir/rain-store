import { SigninForm } from "@/form/auth/signin-form";
import { type Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Signin",
};

const Page = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense>
          <SigninForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
