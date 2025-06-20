import Match from "@/components/Match";
import { getMatchesByCompetition } from "./utils/matches";

export default async function Home() {
  try {
    const matches = await getMatchesByCompetition("FIFA Club World Cup");

    if (!matches) {
      return <div>No matches found</div>;
    }

    return (
      <div>
        <h1>{matches.competition}</h1>
        <div>
          {matches.matches.map((match, index) => (
            <Match key={index} match={match} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching matches:", error);
    return <div>Error: {error.message}</div>;
  }
}