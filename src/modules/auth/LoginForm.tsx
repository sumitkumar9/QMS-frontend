"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ROUTES } from "@/config/routes"

import { loginFormSchema, type LoginFormValues } from "./schema"

// Design inputs are taller with a 2px border and 16px text on every screen size
const INPUT_CLASS_NAME = "h-13 border-2 px-3 text-base md:text-base"
const LABEL_CLASS_NAME = "text-base font-medium"

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  })

  // Sign-in is connected once the authentication method is decided with the backend team
  const handleSubmit = (_values: LoginFormValues) => {}

  return (
    <form noValidate onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-8">
      <FieldGroup className="gap-7">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email" className={LABEL_CLASS_NAME}>
                Email address
              </FieldLabel>
              <Input
                {...field}
                id="email"
                aria-describedby={fieldState.invalid ? "email-error" : undefined}
                type="email"
                autoComplete="email"
                placeholder="operator@company.com"
                aria-invalid={fieldState.invalid}
                className={INPUT_CLASS_NAME}
              />
              <FieldError id="email-error" errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password" className={LABEL_CLASS_NAME}>
                  Password
                </FieldLabel>
                <Link
                  href={ROUTES.forgotPassword}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                {...field}
                id="password"
                aria-describedby={fieldState.invalid ? "password-error" : undefined}
                type="password"
                autoComplete="current-password"
                placeholder="••••••••••"
                aria-invalid={fieldState.invalid}
                className={INPUT_CLASS_NAME}
              />
              <FieldError id="password-error" errors={[fieldState.error]} />
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="h-15 rounded-xl text-xl font-semibold"
      >
        Sign in to dashboard
      </Button>
    </form>
  )
}
