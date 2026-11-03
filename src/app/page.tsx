import type { Metadata } from "next"

import { LoginScreen } from "@/modules/auth/LoginScreen"

export const metadata: Metadata = { title: "Sign in" }

// Temporary: the home route shows sign-in until the dashboard module is built
export default function HomePage() {
  return <LoginScreen />
}
