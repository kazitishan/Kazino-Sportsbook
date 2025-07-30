import Match from "./Match";
import { getMatchesByCompetition } from "@/app/utils/matches";

async function Competition({ name }) {
    try {
        const matches = await getMatchesByCompetition(name);
        
        if (!matches || !matches.matches || matches.matches.length === 0) {
            return (
                <div className="flex items-center p-6">
                    <img src={`/competitions/${name}.svg`} className="w-8 h-8" />
                    <h1 className="text-xl font-bold mx-6">{matches?.competition || name}</h1>
                    <div className="font-bold text-red-500">No matches found</div>
                </div>
            );
        }

        return (
            <div className="my-4">
                <div className="flex items-center p-6 bg-gray-300 rounded-3xl ">
                    <img src={`/competitions/${name}.svg`} className="w-8 h-8" />
                    <h1 className="text-xl font-bold mx-6">{matches.competition}</h1>
                    <div className="border-1 border-[#09C285] bg-[#effbf6] text-[#09C285] text-sm font-medium px-3 py-1 rounded-full">
                        {matches.matches.length}
                    </div>

                    {/* Toggle to expand games and close games */}
                </div>

                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {matches.matches.map((match, index) => (
                        <Match key={`${name}-${index}`} match={match} />
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching matches:", error);
        return <div className="font-bold text-red-600">Error: {error.message}</div>;
    }
}

export default Competition;