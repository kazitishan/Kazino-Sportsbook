import { Inter } from 'next/font/google';
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: "Kazi Tishan",
  description: "My Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased">
        <NavBar/>
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}