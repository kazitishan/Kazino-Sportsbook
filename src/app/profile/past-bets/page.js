import { getResult } from "@/app/utils/result";
import PastBet from "@/components/PastBet";

export default function DisplayPastBets() {
  const exampleBet = {
    competition: "FIFA Club World Cup",
    dateTime: "06/23/2025 21:00 EST",
    homeTeam: "FC Porto",
    awayTeam: "Al Ahly",
    odds: ["1.73", "4.02", "4.50"],
    actualResult: "HOME",
    wager: "$5.00",
    chosenResult: "HOME",
    net: "+$5.00"
  };

  const winningBet = {
    competition: "FIFA Club World Cup",
    dateTime: "06/26/2026 15:00 EST",
    homeTeam: "Juventus",
    awayTeam: "Manchester City",
    odds: ["5.00", "3.75", "1.70"],
    actualResult: "AWAY",
    wager: "$10.00",
    chosenResult: "AWAY",
    net: "+$7.00"
  };
    
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Past Bets</h2>
      <PastBet pastBet={exampleBet} />
      <PastBet pastBet={winningBet} />
      <p>{console.log(winningBet.actualResult)}</p>
    </div>
  );
}