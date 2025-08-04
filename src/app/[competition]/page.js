import Competition from "@/components/Competition";
import { getMatchesByCompetition } from "@/utils/matches";

export async function generateMetadata({ params }) {
  const competitionName = params.competition.replace(/-/g, ' ');
  
  try {
    const matchesData = await getMatchesByCompetition(competitionName);
    
    return {
      title: `${matchesData?.competition || competitionName} | Kazino Sportsbook`,
      description: `${matchesData?.competition || competitionName} - ${matchesData?.matches?.length || 0} matches available for betting`,
    };
  } catch (error) {
    return {
      title: `${competitionName} | Kazino Sportsbook`,
      description: `${competitionName} - Competition details`,
    };
  }
}

export default async function CompetitionDetails({ params }) {
  const competitionName = params.competition.replace(/-/g, ' ');
  
  try {
    const matchesData = await getMatchesByCompetition(competitionName);
    
    return (
      <div className="p-4">
        <Competition 
          name={matchesData?.competition || competitionName} 
          matches={matchesData?.matches || []} 
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching matches:", error);
    return (
      <div className="p-4">
        <Competition 
          name={competitionName} 
          matches={[]} 
        />
      </div>
    );
  }
}