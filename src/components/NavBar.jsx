import Link from "next/link";

function NavBar() {
    return (
        <nav className="p-4 flex justify-between bg-[#014421] h-[66px]">
            <div className="flex items-center gap-10">
                <Link href="/" className="flex items-center">
                    <img src="/logo.png" alt="Kazino Sportsbook Logo" className="w-[115px]" />
                </Link>
                
                <div className="flex gap-8">
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
    );
}

export default NavBar;