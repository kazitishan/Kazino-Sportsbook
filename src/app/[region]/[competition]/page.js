import MatchesContainer from "@/components/MatchesContainer";
import { getMatchesByCompetition } from "@/utils/matches";

export async function generateMetadata({ params }) {
  const { region, competition } = await params;
  const regionName = region.replace(/-/g, ' ');
  const competitionName = competition.replace(/-/g, ' ');
  
  try {
    const competitionData = await getMatchesByCompetition(regionName, competitionName);
    
    return {
      title: `${competitionData?.competition || competitionName} | ${regionName} | Kazino Sportsbook`,
      description: `${competitionData?.competition || competitionName} in ${regionName} - ${competitionData?.matches?.length || 0} matches available for betting`,
    };
  } catch (error) {
    return {
      title: `${competitionName} | ${regionName} | Kazino Sportsbook`,
      description: `${competitionName} in ${regionName} - Competition details`,
    };
  }
}

export default async function CompetitionDetails({ params }) {
  const { region, competition } = await params;
  const regionName = region.replace(/-/g, ' ');
  const competitionName = competition.replace(/-/g, ' ');
  
  try {
    const competitionData = await getMatchesByCompetition(regionName, competitionName);
    
    return (
      <div className="p-4">
        <MatchesContainer 
          name={competitionData.competition} 
          matches={competitionData.matches || []} 
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching matches:", error);
    
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Error</h1>
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">Failed to load matches</h2>
          <p className="text-gray-400 mb-4">{error.message}</p>
          <a 
            href={`/${region}`} 
            className="bg-[#267A54] text-white px-6 py-3 rounded-lg hover:bg-[#1E5A3D] transition-colors"
          >
            Back to {regionName}
          </a>
        </div>
      </div>
    );
  }
}