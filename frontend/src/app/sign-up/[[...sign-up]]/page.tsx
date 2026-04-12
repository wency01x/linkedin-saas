import { SignUp } from "@clerk/nextjs"
import { Box } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f5] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-xl p-8">
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="flex items-center gap-2 mb-4">
            <Box className="w-6 h-6 text-blue-600" />
            <span className="font-oswald text-xl font-bold tracking-wider text-neutral-900">
              LINKED.AI
            </span>
          </div>
          <h1 className="font-oswald text-2xl tracking-tight font-semibold text-neutral-900 mb-2">
            Create your account
          </h1>
          <p className="text-sm text-neutral-500 font-space-grotesk">
            Start your LinkedIn growth journey
          </p>
        </div>

        <SignUp
          fallbackRedirectUrl="/dashboard"
          signInUrl="/sign-in"
          appearance={{
            variables: {
              colorPrimary: '#171717',
              colorBackground: '#ffffff',
              colorInputBackground: '#f9fafb',
              colorInputText: '#171717',
              borderRadius: '0.5rem',
              fontFamily: 'Inter, sans-serif'
            },
            elements: {
              rootBox: "!w-full",
              cardBox: "!w-full !shadow-none !border-none",
              card: "!w-full !bg-transparent !shadow-none !border-none !p-0 !m-0",
              header: "!hidden", 
              formFieldLabel: "text-sm font-space-grotesk text-neutral-700 font-medium mb-1.5",
              formFieldInput: "w-full border border-neutral-200 bg-neutral-50 rounded-lg p-3 text-sm font-inter focus:ring-2 focus:ring-blue-600 outline-none transition-all",
              formButtonPrimary: "w-full bg-neutral-900 text-white rounded-lg uppercase tracking-widest text-xs font-semibold hover:bg-neutral-800 py-3 mt-2 transition-colors",
              socialButtonsBlockButton: "w-full border border-neutral-200 rounded-lg hover:bg-neutral-50 py-2.5 transition-colors",
              socialButtonsBlockButtonText: "font-inter text-sm font-medium text-neutral-700",
              dividerRow: "my-6",
              dividerLine: "bg-neutral-200",
              dividerText: "text-xs text-neutral-400 uppercase font-inter tracking-wider bg-white px-3",
              footerBox: "border-none pt-4",
              footerActionText: "text-sm text-neutral-500 font-space-grotesk",
              footerActionLink: "text-sm text-blue-600 hover:text-blue-700 font-space-grotesk font-medium",
              formFieldDangerText: "text-xs text-red-500 font-inter",
              identityPreviewText: "text-sm font-inter text-neutral-700",
              identityPreviewEditButton: "text-sm text-blue-600 hover:text-blue-700"
            }
          }}
        />
      </div>
    </div>
  )
}