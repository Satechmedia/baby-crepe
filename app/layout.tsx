import type { Metadata } from 'next'
import { inter, montserrat, poppins } from '@/app/fonts/fonts'
import './globals.css'
import AppProviders from '@/app/provider'

export const metadata: Metadata = {
  title: 'BABYCREPE',
  description: 'Baby Crepe is a meme-powered token built on the Binance Smart Chain (BSC) that combines humor, community, and sustainability.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} ${poppins.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <AppProviders>
          <main className="pt-0 transition-all duration-300">{children}</main>
        </AppProviders>
      </body>
    </html>
  )
}
