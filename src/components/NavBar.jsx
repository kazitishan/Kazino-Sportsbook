import Link from "next/link";

function NavBar() {
    return (
        <nav className="p-4 flex justify-between bg-[#000000] h-[66px]">
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
                <p className="text-[#09C285] font-medium text-sm">$100</p>
                <button className="bg-[#09C285] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#07a875] transition-colors">
                    Log Out
                </button>
            </div>
        </nav>
    );
}

export default NavBar;