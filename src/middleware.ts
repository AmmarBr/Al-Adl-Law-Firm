import { withAuth } from "next-auth/middleware";
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
    locales: ['en', 'ar'],
    defaultLocale: 'ar',
    localePrefix: 'always'
});

export default withAuth(
    function middleware(req) {
        return intlMiddleware(req);
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const pathname = req.nextUrl.pathname;

                // If user is trying to access admin pages, they must be logged in
                if (pathname.match(/^\/(en|ar)\/admin/)) {
                    return token !== null;
                }

                // If user is logged in and trying to access login page, redirect to admin
                // Note: This logic is often better handled in the page itself or a separate middleware logic
                // because withAuth logic creates a redirect to the 'signIn' page if authorized returns false.
                // But for redirection away from login, we rely on client-side or server component check.

                return true;
            },
        },
        pages: {
            // This tells NextAuth where to redirect if not authenticated.
            // Problem: It doesn't know the current locale.
            // Workaround: We'll let it default, but we should probably handle it better.
            // Actually, next-intl middleware handles the redirection if we visit /auth/login -> /ar/auth/login.
            // The issue is likely that withAuth might be interfering if we access /auth/login directly.
            signIn: '/auth/login',
        },
    }
);

export const config = {
    // Matcher excluding api, static files, etc.
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
