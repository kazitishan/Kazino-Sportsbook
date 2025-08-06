"use client";

import Link from "next/link";
import CompetitionsSidebar from './CompetitionsSidebar';

const HamburgerMenu = ({ isOpen, onClose }) => {
    const handleLinkClick = () => {
        onClose();
    };

    return (
        <>
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#014421]">
                        <Link href="/" onClick={handleLinkClick} className="flex items-center">
                            <img src="/logo.png" alt="Kazino Sportsbook Logo" className="w-[115px]" />
                        </Link>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-[#267A54] rounded-lg transition-colors text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="space-y-2">
                            <Link 
                                href="/" 
                                onClick={handleLinkClick}
                                className="flex items-center p-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 font-medium"
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Home
                            </Link>
                            <Link 
                                href="/active-bets" 
                                onClick={handleLinkClick}
                                className="flex items-center p-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 font-medium"
                            >
                                <img src="/competitions/Active Bets.svg" alt="Active Bets" className="w-5 h-5 mr-3" />
                                Active Bets
                            </Link>
                            <Link 
                                href="/past-bets" 
                                onClick={handleLinkClick}
                                className="flex items-center p-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 font-medium"
                            >
                                <img src="/competitions/Past Bets.svg" alt="Past Bets" className="w-5 h-5 mr-3" />
                                Past Bets
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