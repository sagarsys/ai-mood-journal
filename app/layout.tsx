import '@/styles/globals.css'
import { geistMono, geistSans } from '@/config/fonts'
import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Mood Journal',
  description: 'Journaling app with AI to get insights on your mood, using NextJs and React'
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        {children}
      </ThemeProvider>
      </body>
      </html>
    </ClerkProvider>
  )
}
