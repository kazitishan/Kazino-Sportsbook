import CompetitionButton from "@/components/CompetitionButton";
import CompetitionsSidebar from "@/components/CompetitionsSidebar";
import SideBar from "@/components/CompetitionsSidebar";

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

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Kazino Sportsbook</span>
          <span className="block text-[#284e13ff] mt-2">Betting Simulator</span>
        </h1>
        
        <div className="mt-8 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">About</h2>
          <p className="text-gray-600 leading-relaxed">
            A gambling simulator for real soccer games designed to replicate authentic betting dynamics, 
            without financial risk. Users engage with virtual currency to experience realistic outcomes, 
            complete with live odds that mirror the genuine sports betting experience. 
            The platform provides all the excitement of sports wagering without its risks.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Available Competitions</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {competitions.map((comp, index) => (
            <CompetitionButton key={`${comp}-${index}`} competition={comp} />
          ))}
        </div>
      </div>
    </div>
  );
}