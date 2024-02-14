import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { defaultLocale, locales } from '@/config'

import { auth as authMiddleware } from '@/auth'

const nextIntlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  // 默认语言不重定向
  localePrefix: 'as-needed',
})

export default function middleware(req: NextRequest) {
  const excludePattern = `^(/(${locales.join('|')}))?(/api/auth/?.*?|/auth/signin)$`
  // const excludePattern = `^(/(${locales.join('|')}))?/api/auth/?.*?$`
  const publicPathnameRegex = RegExp(excludePattern, 'i')
  const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage)
    return nextIntlMiddleware(req)
  return (authMiddleware as any)(req)
}

export const config = {
  // Match only internationalized pathnames
  // matcher: ['/', '/(zh|en)/:path*'],
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
