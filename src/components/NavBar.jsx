"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { useAuth } from "@/contexts/AuthContext";
import { bettingService } from "@/services/bettingService";

function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userBalance, setUserBalance] = useState(null);
    const { user, signOut } = useAuth();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleSignOut = async () => {
        await signOut();
    };

    useEffect(() => {
        if (user) {
            loadUserBalance();
        } else {
            setUserBalance(null);
        }
    }, [user]);

    const loadUserBalance = async () => {
        try {
            const balance = await bettingService.getUserBalance(user.id);
            setUserBalance(balance);
        } catch (error) {
            console.error('Error loading user balance:', error);
        }
    };

    return (
        <>
                                            <nav className="p-4 flex justify-between bg-[#014421] h-[66px] sticky top-0 z-50">
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
                        <Link href="/active-bets" className="text-white text-sm font-medium">
                            Active Bets
                        </Link>
                        <Link href="/past-bets" className="text-white text-sm font-medium">
                            Past Bets
                        </Link>
                    </div>
            </div>

                                        <div className="flex items-center gap-6">
                                {user && userBalance !== null && (
                                    <p className="text-white font-medium text-sm">
                                        ${userBalance.toFixed(2)}
                                    </p>
                                )}
                
                {user ? (
                    <button 
                        onClick={handleSignOut}
                        className="bg-[#267A54] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1E5A3D] transition-colors"
                    >
                        Log Out
                    </button>
                ) : (
                    <Link 
                        href="/login"
                        className="bg-[#267A54] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1E5A3D] transition-colors"
                    >
                        Log In
                    </Link>
                )}
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