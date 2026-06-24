"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignIn } from "@clerk/nextjs";
import { Box, Loader2 } from "lucide-react";

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  // If the user already has an active session, go straight to dashboard.
  // This avoids the "cannot render while signed in" Clerk warning and the
  // redirect loop caused by server-side session mismatches.
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      window.location.href = "/dashboard";
    }
  }, [isLoaded, isSignedIn]);

  // Show spinner while Clerk loads, or while redirecting
  if (!isLoaded || isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f4f5]">
        <div className="flex flex-col items-center gap-3 text-neutral-500">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="text-sm font-space-grotesk">Loading...</span>
        </div>
      </div>
    );
  }

  // User is NOT signed in — show the sign-in form
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f5] p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden pb-6">
        <div className="flex flex-col items-center pt-8 px-8 mb-2 text-center">
          <div className="flex items-center gap-2 mb-4">
            <Box className="w-6 h-6 text-blue-600" />
            <span className="font-oswald text-xl font-bold tracking-wider text-neutral-900">
              NARRAT.AI
            </span>
          </div>
          <h1 className="font-oswald text-2xl tracking-tight font-semibold text-neutral-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-neutral-500 font-space-grotesk">
            Sign in to your account
          </p>
        </div>

        <SignIn
          fallbackRedirectUrl="/dashboard"
          appearance={{
            variables: {
              colorPrimary: "#171717",
              colorBackground: "#ffffff",
              colorInputBackground: "#f9fafb",
              colorInputText: "#171717",
              borderRadius: "0.5rem",
              fontFamily: "Inter, sans-serif",
            },
            elements: {
              rootBox: "!w-full",
              cardBox: "!w-full !shadow-none !border-none",
              card: "!w-full !bg-transparent !shadow-none !border-none",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              formFieldRow: "flex flex-col mb-4",
              formFieldLabelRow: "flex items-center justify-between mb-1.5 w-full",
              formFieldLabel:
                "text-sm font-space-grotesk text-neutral-700 font-medium block",
              formFieldInput:
                "w-full border border-neutral-200 bg-neutral-50 rounded-lg p-3 text-sm font-inter focus:ring-2 focus:ring-blue-600 outline-none transition-all",
              formButtonPrimary:
                "w-full bg-neutral-900 text-white rounded-lg uppercase tracking-widest text-xs font-semibold hover:bg-neutral-800 py-3 mt-2 transition-colors",
              socialButtonsBlockButton:
                "w-full border border-neutral-200 rounded-lg hover:bg-neutral-50 py-2.5 transition-colors",
              socialButtonsBlockButtonText:
                "font-inter text-sm font-medium text-neutral-700",
              dividerRow: "my-6",
              dividerLine: "bg-neutral-200",
              dividerText:
                "text-xs text-neutral-400 uppercase font-inter tracking-wider bg-white px-3",
              footerBox: "border-none pt-4",
              footerActionText: "text-sm text-neutral-500 font-space-grotesk",
              footerActionLink:
                "text-sm text-blue-600 hover:text-blue-700 font-space-grotesk font-medium",
              formFieldDangerText: "text-xs text-red-500 font-inter",
              identityPreview:
                "flex items-center justify-between w-full border border-neutral-200 bg-neutral-50 rounded-lg p-3 mb-6",
              identityPreviewText: "text-sm font-inter text-neutral-700",
              identityPreviewEditButton: "text-sm text-blue-600 hover:text-blue-700",
              formFieldInputShowPasswordButton:
                "text-neutral-500 hover:text-neutral-700 transition-colors",
            },
          }}
        />
      </div>
    </div>
  );
}