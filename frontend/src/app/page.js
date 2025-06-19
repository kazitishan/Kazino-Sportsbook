import Image from "next/image";

export default function Home() {
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
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {competitions.map((competition) => (
          <div 
            key={competition} 
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative w-24 h-24 mb-2">
              <Image
                src={`/competitions/${competition}.svg`}
                alt={competition}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 200px"
              />
            </div>
            <p className="text-sm font-medium text-center text-gray-700 mt-2">
              {competition}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}