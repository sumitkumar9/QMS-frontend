import Image from "next/image"
import Link from "next/link"

import { ROUTES } from "@/config/routes"

import { LoginForm } from "./LoginForm"
import { LoginHero } from "./LoginHero"

export function LoginScreen() {
  return (
    <div className="grid min-h-dvh grid-cols-1 bg-card lg:grid-cols-[minmax(0,1fr)_min(44rem,45%)]">
      <LoginHero />

      <main className="flex flex-col gap-8 px-6 py-8 sm:px-14 2xl:gap-12 2xl:py-15">
        <Image src="/images/logo.png" alt="Top Quality Engineering" width={198} height={50} />

        <div className="mx-auto flex w-full max-w-105 flex-1 flex-col justify-center gap-8 2xl:gap-10">
          <header className="flex flex-col gap-1.5 text-center">
            <h1 className="text-page-title xl:whitespace-nowrap">
              Welcome to Compliance Intelligence
            </h1>
            <p className="text-base text-muted-foreground">Sign in to your compliance dashboard</p>
          </header>

          <div className="flex flex-col gap-6 2xl:gap-8">
            <LoginForm />

            <aside className="flex gap-2.5 rounded-lg border bg-background px-4 py-3">
              <Image
                src="/images/secure-access.svg"
                alt=""
                width={32}
                height={32}
                className="size-8 shrink-0"
              />
              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold text-primary">Secure Access</p>
                <p className="text-[0.9375rem] leading-normal text-muted-foreground">
                  This system is for authorized personnel only. All sessions are logged, monitored,
                  and subject to security review.
                </p>
              </div>
            </aside>
          </div>
        </div>

        <p className="text-center text-base font-medium text-muted-foreground">
          Need access?{" "}
          <Link href={ROUTES.requestAccess} className="font-semibold text-primary hover:underline">
            Contact administrator
          </Link>
        </p>
      </main>
    </div>
  )
}
