import clsx from 'clsx'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'O boticário',
  description: 'oboticário test case',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="br">
      <body className={clsx(inter.className, 'bg-gray-100')}>
        <Navbar />      
        <main className='h-screen p-5'>
          {children}
        </main>
      </body>
    </html>
  )
}
