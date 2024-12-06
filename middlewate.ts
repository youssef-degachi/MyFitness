import { authMiddleware } from '@clerk/clerk-react';

export default authMiddleware({
  publicRoutes: ["/", "/login"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

