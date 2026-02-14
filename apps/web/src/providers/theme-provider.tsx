"use client"

import { type ReactNode } from "react"

import { ThemeProvider as NextThemesProvider } from "next-themes"

import { THEME_DEFAULT_THEME, THEME_ENABLE_SYSTEM } from "@/constants/theme"

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={THEME_DEFAULT_THEME}
      enableSystem={THEME_ENABLE_SYSTEM}
    >
      {children}
    </NextThemesProvider>
  )
}
