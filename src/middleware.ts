import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server"

const isLoginPage = createRouteMatcher(["/auth"]);
const isProtectedRoute = createRouteMatcher(["/test(.*)"]);

export default convexAuthNextjsMiddleware((req) =>{
    if (!isLoginPage(req) && !isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(req, "/auth")
    }

    if (isLoginPage(req) && isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(req, "/")
    }
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};