import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from '@/config'

// Can be imported from a shared config
// const locales = ['en', 'de']

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale))
    notFound()

  let localeFile = import('./messages/zh.json')
  switch (locale) {
    case 'en':
      localeFile = import('./messages/en.json')
      break
    default:
      break
  }

  // return {
  //   messages: (await import(`messages/${locale}.json`)).default,
  // }
  return {
    messages: (await localeFile).default,
  }
})
