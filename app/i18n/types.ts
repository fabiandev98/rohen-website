export const supportedLocales = ['en', 'es', 'pt'] as const
export type SupportedLocale = (typeof supportedLocales)[number]
