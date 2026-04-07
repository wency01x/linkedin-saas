"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useClerk } from "@clerk/nextjs";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

import { motion } from "framer-motion";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard Overview",
  "/dashboard/generate": "AI Content Generation",
  "/dashboard/analytics": "Performance Analytics",
  "/dashboard/settings": "Account Settings",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user, isLoading } = useUser();

  const title = titles[pathname] || "Dashboard Overview";

  useEffect(() => {
    if (!isLoading && user && !user.industry) {
      router.push("/onboarding");
    }
  }, [user, isLoading, router]);

  if (isLoading || (user && !user.industry)) {
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
    <div className="h-screen w-full antialiased text-neutral-900 bg-white flex overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-neutral-200 bg-neutral-50 flex-col justify-between hidden md:flex shrink-0">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-10 text-neutral-900">
              <div className="flex text-white bg-blue-600 w-8 h-8 rounded-lg relative items-center justify-center shadow-sm">
                <Icon icon="solar:pen-new-square-linear" className="text-lg" />
              </div>
              <span className="font-oswald text-xl tracking-tight uppercase font-medium">
                LINKED.AI
              </span>
            </div>

            <nav className="space-y-2 font-medium text-sm">
              <Link
                href="/dashboard"
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  pathname === "/dashboard"
                    ? "bg-neutral-200 text-neutral-900"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                <Icon icon="solar:widget-linear" className="text-lg" /> Dashboard
              </Link>
              <Link
                href="/dashboard/generate"
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  pathname === "/dashboard/generate"
                    ? "bg-neutral-200 text-neutral-900"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                <Icon icon="solar:magic-stick-3-linear" className="text-lg" />{" "}
                Generate
              </Link>
              <Link
                href="/dashboard/analytics"
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  pathname === "/dashboard/analytics"
                    ? "bg-neutral-200 text-neutral-900"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                <Icon icon="solar:chart-square-linear" className="text-lg" />{" "}
                Analytics
              </Link>
              <Link
                href="/dashboard/settings"
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  pathname === "/dashboard/settings"
                    ? "bg-neutral-200 text-neutral-900"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                <Icon icon="solar:settings-linear" className="text-lg" /> Settings
              </Link>
            </nav>
          </div>

          <div className="p-6 border-t border-neutral-200">
            <div className="flex items-center gap-3 w-full">
              <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 shrink-0">
                <Icon icon="solar:user-linear" className="text-lg" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-sm font-semibold truncate">
                  {user?.full_name || "User"}
                </div>
                <div className="text-[0.65rem] text-neutral-500 uppercase tracking-widest truncate">
                  {user?.email || ""}
                </div>
              </div>
              <button
                onClick={() => signOut(() => {})}
                className="text-neutral-400 hover:text-red-500 transition-colors"
                title="Log Out"
              >
                <Icon icon="solar:logout-2-linear" className="text-lg" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
          {/* Top Navbar */}
          <header className="h-16 border-b border-neutral-200 bg-white flex items-center justify-between px-8 shrink-0">
            <h1
              id="app-page-title"
              className="text-xl font-oswald font-medium tracking-tight text-neutral-900"
            >
              {title}
            </h1>
            <div className="flex items-center gap-4">
              <button className="relative text-neutral-500 hover:text-neutral-900 transition-colors">
                <Icon icon="solar:bell-linear" className="text-xl" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
            </div>
          </header>

          {/* Scrollable Views Container */}
          <main className="flex-1 overflow-y-auto p-8 bg-neutral-50">
            {children}
          </main>
        </div>
    </div>
  );
}
