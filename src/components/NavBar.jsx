"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
            <nav className="bg-background border-b border-border sticky top-0 z-50">
                <div className="px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        {/* Hamburger Menu Button */}
                        <Button 
                            variant="ghost"
                            size="sm"
                            onClick={toggleMobileMenu}
                            className="lg:hidden p-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </Button>
                        
                        <Link href="/" className="flex items-center">
                            <img src="/logo.png" alt="Kazino Sportsbook Logo" className="h-8" />
                        </Link>
                        
                        {/* Navigation Links */}
                        <div className="hidden lg:flex gap-6">
                            <Link href="/" className="text-foreground text-sm font-medium hover:text-muted-foreground transition-colors">
                                Home
                            </Link>
                            <Link href="/active" className="text-foreground text-sm font-medium hover:text-muted-foreground transition-colors">
                                Active
                            </Link>
                            <Link href="/settled" className="text-foreground text-sm font-medium hover:text-muted-foreground transition-colors">
                                Settled
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {user && userBalance !== null && (
                            <Badge variant="secondary" className="text-sm font-medium">
                                ${userBalance.toFixed(2)}
                            </Badge>
                        )}
                        
                        {user ? (
                            <Button 
                                variant="outline"
                                size="sm"
                                onClick={handleSignOut}
                            >
                                Log Out
                            </Button>
                        ) : (
                            <Button asChild size="sm">
                                <Link href="/login">Log In</Link>
                            </Button>
                        )}
                    </div>
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