import { getResult } from "@/app/utils/result";
import PastBet from "@/components/PastBet";

export default function DisplayPastBets() {
  const exampleBet = {
    competition: "FIFA Club World Cup",
    dateTime: "06/23/2025 21:00 EST",
    homeTeam: "FC Porto",
    awayTeam: "Al Ahly",
    odds: ["1.73", "4.02", "4.50"],
    actualResult: "Away",
    wager: "$5.00",
    chosenResult: "Home",
    potentialPayout: "$8.65",
    actualPayout: "$0.00",
    net: "-$5.00"
  };

  const winningBet = {
    competition: "FIFA Club World Cup",
    dateTime: "06/26/2026 15:00 EST",
    homeTeam: "Juventus",
    awayTeam: "Manchester City",
    odds: ["5.00", "3.75", "1.70"],
    actualResult: getResult("/football/world/fifa-club-world-cup/juventus-manchester-city/dzEgdp5F/#1x2"),
    wager: "$10.00",
    chosenResult: "Home",
    potentialPayout: "$21.00",
    actualPayout: "$21.00",
    net: "+$11.00"
  };
    
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Past Bets</h2>
      <PastBet pastBet={exampleBet} />
      <PastBet pastBet={winningBet} />
    </div>
  );
}