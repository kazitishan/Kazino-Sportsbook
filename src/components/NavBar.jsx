"use client"

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

function NavBar() {
    const competitions = [
        "UEFA Nations League",
        "Copa America",
        "UCL",
        "UEL",
        "UECL",
        "UEFA Super Cup",
        "FIFA Club World Cup",
        "Premier League",
        "La Liga",
        "Bundesliga",
        "Serie A",
        "Ligue 1",
        "EFL Championship",
        "FA Cup",
        "EFL Cup",
        "Community Shield",
        "Supercopa de España",
        "Copa del Rey",
        "DFB Pokal",
        "German Super Cup",
        "Coppa Italia",
        "Supercoppa Italiana",
        "Coupe de France",
        "French Super Cup"
    ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white shadow-md">
            <div className="p-8 flex items-center bg-[#284e13ff] relative h-16">
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <Link href="/" className="flex items-center">
                        <img src="/logo.svg" alt="Kazino Sportsbook Logo" className="w-20" />
                    </Link>
                </div>

                <div className="ml-auto flex gap-4 items-center">
                    <p className="text-[#09C285]">$100</p>
                    
                    <div className="relative" ref={dropdownRef}>
                        <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center focus:outline-none"
                        >
                            <img 
                                src="/default-profile.png" 
                                alt="Profile" 
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        </button>
                        
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <Link
                                    href="/profile/active-bets"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Active Bets
                                </Link>
                                <Link
                                    href="/profile/past-bets"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Past Bets
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 p-4 bg-gray-100">
                {competitions.map((comp, index) => (
                    <Link 
                        href={`/${comp.replace(/\s+/g, '-')}`} 
                        key={`${comp}-${index}`} 
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap transition-colors"
                    >
                        {comp}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default NavBar;