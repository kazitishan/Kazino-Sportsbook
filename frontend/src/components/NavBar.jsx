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
            <div className="px-8 flex justify-center items-center bg-[#284e13ff]">
                <Link href="/" className="">
                    <img src="/logo.svg" alt="Kazino Sportsbook Logo" className="w-30 h-25" />
                </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 p-4 bg-gray-100">
                {competitions.map((comp, index) => (
                    <Link 
                        href={`/${comp}`} 
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