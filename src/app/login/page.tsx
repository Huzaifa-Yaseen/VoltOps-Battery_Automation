"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DEMO_EMAIL, DEMO_PASSWORD, setAuthenticated } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState(DEMO_EMAIL)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (!email.trim() || password.length < 4) {
      setError("Enter a valid work email and password.")
      return
    }

    setIsSubmitting(true)
    window.setTimeout(() => {
      setAuthenticated(true)
      router.push("/dashboard")
    }, 700)
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,91,219,0.12),_transparent_42%),linear-gradient(180deg,var(--background),oklch(0.96_0.01_250))] px-4 py-10">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-5">
        <BrandLogo />
        <p className="hidden text-sm text-muted-foreground sm:block">
          Internal operations portal
        </p>
      </div>
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="space-y-3">
          <CardTitle className="text-center text-xl">Sign in to VoltOps</CardTitle>
          <CardDescription className="text-center">
            Access the laptop battery sales automation workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nina.v@example.com"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <ForgotPasswordLink />
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  className="pr-9"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  className="absolute top-1/2 right-1.5 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
              {isSubmitting ? <Loader2 className="animate-spin" /> : null}
              {isSubmitting ? "Signing in..." : "Login"}
            </Button>
          </form>
          <div className="mt-5 rounded-lg bg-muted/70 px-3 py-2.5 text-xs text-muted-foreground">
            Demo access: <span className="font-medium text-foreground">{DEMO_EMAIL}</span>
            {" · "}
            password <span className="font-medium text-foreground">{DEMO_PASSWORD}</span>
            {" or any password with 4+ characters."}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ForgotPasswordLink() {
  const [resetEmail, setResetEmail] = useState("")
  const [resetSent, setResetSent] = useState(false)

  function handleReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!resetEmail.trim()) {
      return
    }
    setResetSent(true)
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setResetSent(false)
        }
      }}
    >
      <DialogTrigger
        render={<Button type="button" variant="link" className="h-auto px-0" />}
      >
        Forgot password?
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reset password</DialogTitle>
          <DialogDescription>
            Enter your work email and we will send a reset link.
          </DialogDescription>
        </DialogHeader>
        {resetSent ? (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            If an account exists for {resetEmail}, a reset link has been queued.
          </p>
        ) : (
          <form className="space-y-3" onSubmit={handleReset}>
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                value={resetEmail}
                onChange={(event) => setResetEmail(event.target.value)}
                placeholder="nina.v@example.com"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Send reset link</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
