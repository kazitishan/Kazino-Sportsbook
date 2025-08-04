"use client";

import Link from "next/link";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
                    <nav className="p-4 flex justify-between bg-[#014421] h-[66px]">
            <div className="flex items-center gap-4">
                {/* Hamburger Menu Button */}
                <button 
                    onClick={toggleMobileMenu}
                    className="lg:hidden p-2 text-white hover:bg-[#267A54] rounded-lg transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                
                <Link href="/" className="flex items-center">
                    <img src="/logo.png" alt="Kazino Sportsbook Logo" className="w-[115px]" />
                </Link>
                
                {/* Navigation Links */}
                <div className="hidden lg:flex gap-8">
                    <Link href="/" className="text-white text-sm font-medium">
                        Home
                    </Link>
                    <Link href="/profile/active-bets" className="text-white text-sm font-medium">
                        Active Bets
                    </Link>
                    <Link href="/profile/past-bets" className="text-white text-sm font-medium">
                        Past Bets
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <p className="text-white font-medium text-sm">$100</p>
                
                <button className="bg-[#267A54] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1E5A3D] transition-colors">
                    Log Out
                </button>
            </div>
        </nav>

            {/* Hamburger Menu */}
            <HamburgerMenu 
                isOpen={isMobileMenuOpen} 
                onClose={() => setIsMobileMenuOpen(false)} 
            />
        </>
    );
}

export default NavBar;