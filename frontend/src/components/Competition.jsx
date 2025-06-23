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
                <div className="flex items-center p-6">
                    <img src={`/competitions/${name}.svg`} className="w-12 h-12"></img>
                    <h1 className="text-2xl font-bold mx-6">{matches.competition}</h1>
                    <div className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {matches.matches.length}
                    </div>
                </div>

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