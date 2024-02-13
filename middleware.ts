import createMiddleware from 'next-intl/middleware'
import { defaultLocale, locales } from '@/config'

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  // 默认语言不重定向
  localePrefix: 'as-needed',
})

export const config = {
  // Match only internationalized pathnames
  // matcher: ['/', '/(zh|en)/:path*'],
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
