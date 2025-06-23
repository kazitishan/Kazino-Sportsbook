import Match from "./Match";
import { getMatchesByCompetition } from "@/app/utils/matches";

async function Competition({ name }) {
    try {
        const matches = await getMatchesByCompetition(name);
        
        if (!matches || !matches.matches) {
            return <div>No matches found</div>;
        }

        return (
            <div>
              <h1>{matches.competition || name}</h1>
              <div>
                {matches.matches.map((match, index) => (
                  <Match key={`${name}-${index}`} match={match} />
                ))}
              </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching matches:", error);
        return <div>Error: {error.message}</div>;
    }
}

export default Competition;