import { Inter } from 'next/font/google';
import "./globals.css";
import NavBar from "@/components/NavBar";
import CompetitionsSidebar from '@/components/CompetitionsSidebar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: "Kazino Sportsbook",
  description: "Bet on real games without suffering the consequences",
  icons: {
    icon: '/logo.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased">
        <NavBar/>
        <div className='flex'>
          <CompetitionsSidebar/>
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}