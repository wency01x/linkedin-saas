import { clerkMiddleware } from "@clerk/nextjs/server";

// Middleware runs but does NOT block any routes.
// Auth protection is handled client-side in layout components.
// This avoids the server/client session mismatch redirect loop.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};