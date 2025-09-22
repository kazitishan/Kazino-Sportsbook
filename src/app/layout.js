import { Inter } from 'next/font/google';
import "./globals.css";
import NavBar from "@/components/NavBar";
import CompetitionsSidebar from '@/components/CompetitionsSidebar';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: "Kazino Sportsbook",
  description: "Bet on real games without suffering the consequences",
  icons: {
    icon: '/tab-logo.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="antialiased bg-background text-foreground">
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <NavBar/>
            <div className="flex flex-1">
              {/* Left Sidebar - Competitions */}
              <div className="hidden lg:block w-80 bg-muted/50 border-r">
                <CompetitionsSidebar/>
              </div>
              
              {/* Main Content Area */}
              <div className="flex-1 flex">
                <div className="flex-1 max-w-4xl mx-auto">
                  {children}
                </div>
                
                {/* Right Sidebar - Bet Slip */}
                <div className="hidden xl:block w-80 bg-muted/50 border-l">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Bet Slip</h2>
                    <div className="flex items-center justify-center h-64 bg-card rounded-lg border">
                      <p className="text-muted-foreground">Bet Slip placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}