import ActiveBet from "@/components/ActiveBet";

export default function DisplayActiveBets() {
  const exampleBet = {
    competition: "UEFA Super Cup",
    dateTime: "08/13/2025 15:00 EST",
    homeTeam: "PSG",
    awayTeam: "Tottenham",
    odds: ["1.37", "5.12", "7.28"],
    wager: "$5.00",
    chosenResult: "HOME",
    potentialPayout: "$6.85",
    link: "/football/europe/uefa-super-cup/psg-tottenham/8CroQLLc/"
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Active Bets</h2>
      <ActiveBet activeBet={exampleBet} />
    </div>
  );
}