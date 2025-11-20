import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MindCraft 3D',
  description: 'A 3D Minecraft-style voxel game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
