import { Inter } from 'next/font/google'
import { DataProvider } from '../contexts/DataContext'
import { SavedQuestionsProvider } from '../contexts/SavedQuestionsContext'
import { Navbar } from '@/components/Navbar'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SavedQuestionsProvider>
          <DataProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow bg-background">
                {children}
              </main>
              <footer className="bg-primary/5 py-6">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                  © 2023 LeetCode Prep. All rights reserved.
                </div>
              </footer>
            </div>
          </DataProvider>
        </SavedQuestionsProvider>
      </body>
    </html>
  )
}

