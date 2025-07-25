import { getResult } from "@/app/utils/result";
import PastBet from "@/components/PastBet";

export default function DisplayPastBets() {
  const pastBets = [
    {
      competition: "FIFA Club World Cup",
      dateTime: "06/23/2025 21:00 EST",
      homeTeam: "FC Porto",
      awayTeam: "Al Ahly",
      odds: ["1.73", "4.02", "4.50"],
      actualResult: "HOME",
      wager: "$5.00",
      chosenResult: "HOME",
      netPayout: "+$5.00",
      link: "/football/world/club-world-cup/porto-ahly/8CroQLLc/"
    },
    {
      competition: "FIFA Club World Cup",
      dateTime: "06/26/2026 15:00 EST",
      homeTeam: "Juventus",
      awayTeam: "Manchester City",
      odds: ["5.00", "3.75", "1.70"],
      actualResult: "AWAY",
      wager: "$10.00",
      chosenResult: "AWAY",
      netPayout: "+$7.00",
      link: "/football/world/club-world-cup/juve-city/9DroQMMd/"
    },
    {
      competition: "Premier League",
      dateTime: "07/01/2025 14:00 EST",
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      odds: ["2.10", "3.40", "3.20"],
      actualResult: "DRAW",
      wager: "$15.00",
      chosenResult: "HOME",
      netPayout: "-$15.00",
      link: "/football/england/premier-league/arsenal-chelsea/7EroPNNf/"
    }
  ];
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Past Bets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pastBets.map((bet, index) => (
          <PastBet key={`past-bet-${index}`} pastBet={bet} />
        ))}
      </div>
    </div>
  );
}