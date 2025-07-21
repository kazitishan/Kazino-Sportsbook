import Link from "next/link";

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

    return (
        <nav className="bg-white shadow-md">
            {/* Top Navigation Bar */}
            <div className="px-6 py-3 flex justify-between items-center bg-[#000000] h-[66px]">
                {/* Left Section - Logo and Navigation */}
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center">
                        <img src="/logo.png" alt="Kazino Sportsbook Logo" className="w-[115px] h-auto" />
                    </Link>
                    
                    <div className="flex gap-8">
                        <Link href="/" className="text-white text-sm font-medium hover:text-gray-300 transition-colors">
                            Home
                        </Link>
                        <Link href="/profile/active-bets" className="text-white text-sm font-medium hover:text-gray-300 transition-colors">
                            Active Bets
                        </Link>
                        <Link href="/profile/past-bets" className="text-white text-sm font-medium hover:text-gray-300 transition-colors">
                            Past Bets
                        </Link>
                    </div>
                </div>

                {/* Right Section - Balance and Login */}
                <div className="flex items-center gap-6">
                    <p className="text-[#09C285] font-medium text-sm">$100</p>
                    <button className="bg-[#09C285] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#07a875] transition-colors">
                        Log Out
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;