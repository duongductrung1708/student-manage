import Link from 'next/link';
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-black to-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link className='text-white text-xl font-bold' href='/'>
              Home
            </Link>
            <div className="space-x-4">
              <Link className='text-black' href='/students'>
                Students
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
