"use client";

import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CompetitionsSidebar from './CompetitionsSidebar';

const HamburgerMenu = ({ isOpen, onClose }) => {
    const handleLinkClick = () => {
        onClose();
    };

    return (
        <>
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-background border-r border-border shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <Link href="/" onClick={handleLinkClick} className="flex items-center">
                            <img src="/logo.png" alt="Kazino Sportsbook Logo" className="h-8" />
                        </Link>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="p-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Button>
                    </div>

                    {/* Navigation Links */}
                    <div className="p-4 border-b border-border">
                        <div className="space-y-2">
                            <Link 
                                href="/" 
                                onClick={handleLinkClick}
                                className="flex items-center p-3 hover:bg-muted/50 rounded-lg transition-colors text-foreground font-medium"
                            >
                                <img src="/competitions/Home.svg" alt="Home" className="w-5 h-5 mr-3" />
                                Home
                            </Link>
                            <Link 
                                href="/active" 
                                onClick={handleLinkClick}
                                className="flex items-center p-3 hover:bg-muted/50 rounded-lg transition-colors text-foreground font-medium"
                            >
                                <img src="/competitions/Active.svg" alt="Active" className="w-5 h-5 mr-3" />
                                Active
                            </Link>
                            <Link 
                                href="/settled" 
                                onClick={handleLinkClick}
                                className="flex items-center p-3 hover:bg-muted/50 rounded-lg transition-colors text-foreground font-medium"
                            >
                                <img src="/competitions/Settled.svg" alt="Settled" className="w-5 h-5 mr-3" />
                                Settled
                            </Link>
                        </div>
                    </div>

                    {/* Competitions */}
                    <div className="flex-1 overflow-y-auto">
                        <CompetitionsSidebar onLinkClick={handleLinkClick} isMobile={true} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HamburgerMenu; 