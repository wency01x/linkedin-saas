"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { AppShell } from "@/components/app-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const { user, isLoading } = useUser();

  // Client-side auth guard — redirect to sign-in if not authenticated
  useEffect(() => {
    if (isAuthLoaded && !isSignedIn) {
      window.location.href = "/sign-in";
    }
  }, [isAuthLoaded, isSignedIn]);

  // Once backend user is loaded, redirect to onboarding if profile incomplete
  useEffect(() => {
    if (!isLoading && isSignedIn && user && !user.industry) {
      router.push("/onboarding");
    }
  }, [user, isLoading, isSignedIn, router]);

  if (isLoading || !user || !user.industry) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-blue-600/10"
              animate={{ y: ["100%", "0%"] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
            <Icon icon="solar:check-circle-bold-duotone" className="text-4xl text-blue-600 relative z-10" />
          </div>
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="font-oswald text-3xl uppercase tracking-tight text-neutral-900 font-medium mb-1"
            >
              Signed In
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-xs font-space text-neutral-500 tracking-widest uppercase"
            >
              Preparing Workspace...
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <AppShell>
      {children}
    </AppShell>
  );
}
