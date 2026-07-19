import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sam Phin - Welcome to my portfolio!',
  description: 'Sam Phin is a frontend software engineer specializing in TypeScript, React, Next.js, and Node.js. Explore my projects, skills, and experience in web development. Take the lessons from yesterday, apply them today, and create a better tomorrow. - Sam Phin',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
