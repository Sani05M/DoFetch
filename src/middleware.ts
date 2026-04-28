import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/login(.*)",
  "/api/webhook(.*)", // For clerk/supabase sync
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const url = req.nextUrl.pathname;

  // 1. Handle authenticated users on the landing page
  if (userId && url === "/") {
    // Fetch fresh user data to ensure we have the correct email for routing
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email = user.primaryEmailAddress?.emailAddress;

    if (email?.endsWith("@stu.adamasuniversity.ac.in")) {
      return NextResponse.redirect(new URL("/student/dashboard", req.url));
    } else if (email?.endsWith("@adamasuniversity.ac.in")) {
      return NextResponse.redirect(new URL("/faculty/dashboard", req.url));
    } else {
      // Default fallback for authenticated users with unknown domains
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
  }

  // 2. Protect non-public routes
  if (!isPublicRoute(req)) {
    if (!userId) {
      return (await auth()).redirectToSignIn();
    }

    const email = sessionClaims?.email as string;

    // Adamas University Domain Lock
    if (email) {
      const isStudent = email.endsWith("@stu.adamasuniversity.ac.in");
      const isFaculty = email.endsWith("@adamasuniversity.ac.in");

      if (!isStudent && !isFaculty) {
        return NextResponse.redirect(new URL("/login?error=unauthorized_domain", req.url));
      }

      // Role-based path protection
      if (isStudent && url.startsWith("/faculty")) {
        return NextResponse.redirect(new URL("/student/dashboard", req.url));
      }

      if (isFaculty && url.startsWith("/student")) {
        return NextResponse.redirect(new URL("/faculty/dashboard", req.url));
      }
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
