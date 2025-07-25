import ActiveBet from "@/components/ActiveBet";

export default function DisplayActiveBets() {
  const exampleBets = [
    {
      competition: "UEFA Super Cup",
      dateTime: "08/13/2025 15:00 EST",
      homeTeam: "PSG",
      awayTeam: "Tottenham",
      odds: ["1.37", "5.12", "7.28"],
      wager: "$5.00",
      chosenResult: "HOME",
      netPayout: "$6.85",
      link: "/football/europe/uefa-super-cup/psg-tottenham/8CroQLLc/"
    },
    {
      competition: "Premier League",
      dateTime: "08/14/2025 12:30 EST",
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      odds: ["2.10", "3.40", "3.20"],
      wager: "$10.00",
      chosenResult: "DRAW",
      netPayout: "$34.00",
      link: "/football/england/premier-league/man-city-liverpool/9DroQMMd/"
    },
    {
      competition: "La Liga",
      dateTime: "08/15/2025 14:00 EST",
      homeTeam: "Barcelona",
      awayTeam: "Real Madrid",
      odds: ["2.50", "3.20", "2.80"],
      wager: "$7.50",
      chosenResult: "AWAY",
      netPayout: "$21.00",
      link: "/football/spain/la-liga/barca-madrid/7EroPNNf/"
    }
  ];
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Active Bets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exampleBets.map((bet, index) => (
          <ActiveBet key={`active-bet-${index}`} activeBet={bet} />
        ))}
      </div>
    </div>
  );
}