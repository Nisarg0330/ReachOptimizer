'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"

export function OTPForm({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [resending, setResending] = useState(false)

  if (!isLoaded) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length !== 6) return

    setError("")
    setLoading(true)

    try {
      const completeSignUp = await signUp?.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp?.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })
        router.push("/") // ← Change to your main app route
      } else {
        setError("Invalid or expired code. Please try again.")
      }
    } catch (err: any) {
      const message =
        err.errors?.[0]?.longMessage ||
        "Invalid or expired code. Please try again."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isLoaded || !signUp) return

    setResending(true)
    setError("")

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
      // Optional: show success toast/message
    } catch (err: any) {
      setError("Failed to resend code. Please try again.")
    } finally {
      setResending(false)
    }
  }

  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Enter verification code</CardTitle>
        <CardDescription>
          We sent a 6-digit code to your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp" className="sr-only">
                Verification code
              </FieldLabel>
              <InputOTP
                maxLength={6}
                id="otp"
                value={code}
                onChange={(value) => setCode(value)}
                disabled={loading}
              >
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription className="text-center">
                Enter the 6-digit code sent to your email.
              </FieldDescription>
            </Field>

            {error && (
              <p className="text-sm text-red-500 text-center -mt-2 mb-3">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading || code.length !== 6}
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>

            <FieldDescription className="text-center">
              Didn&apos;t receive the code?{" "}
              <a
                href="#"
                onClick={handleResend}
                className="underline hover:text-primary"
              >
                {resending ? "Resending..." : "Resend"}
              </a>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}