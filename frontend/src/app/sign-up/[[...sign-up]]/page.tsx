import { SignUp } from "@clerk/nextjs"
import { Box } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg bg-card rounded-2xl border border-border shadow-sm overflow-hidden pb-6">
        <div className="flex flex-col items-center pt-8 px-8 mb-2 text-center">
          <div className="flex items-center gap-2 mb-4">
            <Box className="w-6 h-6 text-primary" />
            <span className="font-oswald text-xl font-bold tracking-wider text-foreground">
              NARRAT.AI
            </span>
          </div>
          <h1 className="font-oswald text-2xl tracking-tight font-semibold text-foreground mb-2">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground font-space-grotesk">
            Start your LinkedIn growth journey
          </p>
        </div>

        <SignUp
          fallbackRedirectUrl="/onboarding"
          appearance={{
            elements: {
              rootBox: "!w-full",
              cardBox: "!w-full !shadow-none !border-none",
              card: "!w-full !bg-transparent !shadow-none !border-none",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              formFieldRow: "flex flex-col mb-4",
              formFieldLabelRow: "flex items-center justify-between mb-1.5 w-full",
              formFieldLabel: "text-sm font-space-grotesk text-foreground font-medium block",
              formFieldInput: "w-full border border-input bg-background rounded-lg p-3 text-sm font-inter text-foreground focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all",
              formButtonPrimary: "w-full bg-primary text-primary-foreground rounded-lg uppercase tracking-widest text-xs font-semibold hover:opacity-90 py-3 mt-2 transition-opacity",
              socialButtonsBlockButton: "w-full border border-border bg-background rounded-lg hover:bg-accent hover:text-accent-foreground py-2.5 transition-colors",
              socialButtonsBlockButtonText: "font-inter text-sm font-medium text-foreground",
              dividerRow: "my-6",
              dividerLine: "bg-border",
              dividerText: "text-xs text-muted-foreground uppercase font-inter tracking-wider bg-card px-3",
              footerBox: "border-none pt-4",
              footerActionText: "text-sm text-muted-foreground font-space-grotesk",
              footerActionLink: "text-sm text-primary hover:opacity-80 font-space-grotesk font-medium",
              formFieldDangerText: "text-xs text-destructive font-inter",
              identityPreview: "flex items-center justify-between w-full border border-border bg-muted rounded-lg p-3 mb-6",
              identityPreviewText: "text-sm font-inter text-foreground",
              identityPreviewEditButton: "text-sm text-primary hover:opacity-80",
              formFieldInputShowPasswordButton: "text-muted-foreground hover:text-foreground transition-colors"
            }
          }}
        />
      </div>
    </div>
  )
}