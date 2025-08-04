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
    icon: '/tab-logo.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased">
        <NavBar/>
        <div className='flex'>
          <div className="hidden lg:block">
            <CompetitionsSidebar/>
          </div>
          <div className="w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}