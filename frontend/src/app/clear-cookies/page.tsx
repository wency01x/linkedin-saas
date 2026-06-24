"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClearCookiesPage() {
  const router = useRouter();

  useEffect(() => {
    // 1. Clear all cookies on localhost
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      document.cookie = name + `=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
    }

    // 2. Clear local storage and session storage
    localStorage.clear();
    sessionStorage.clear();

    // 3. Redirect to sign-in page
    console.log("Cookies and storage cleared. Redirecting to sign-in...");
    router.replace("/sign-in");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 text-neutral-500 font-mono text-sm">
      Clearing local session and cookies...
    </div>
  );
}
