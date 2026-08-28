import type { Metadata } from 'next'
import './globals.css'
import { AtlasProvider } from '@/lib/store'
import { TopBar } from '@/components/TopBar'
import { SearchPalette } from '@/components/SearchPalette'

export const metadata: Metadata = {
  title: 'Activity Atlas',
  description:
    'A zoomable coverage map of human physical activity for robotics and world-model data collection.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AtlasProvider>
          <div className="shell">
            <TopBar />
            <div style={{ minHeight: 0, height: '100%' }}>{children}</div>
          </div>
          <SearchPalette />
        </AtlasProvider>
      </body>
    </html>
  )
}
