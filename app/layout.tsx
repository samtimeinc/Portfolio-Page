import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sam Phin Portfolio - Welcome!',
  description: 'Portfolio website for Sam Phin, a frontend software engineer specializing Typescript, React, Next.js, and Node.js. Explore my projects, skills, and experience in web development.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
