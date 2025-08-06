import MatchesContainer from "@/components/MatchesContainer";
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
    if (error.message === 'Competition not found') {
      return {
        title: 'Kazino Sportsbook',
        description: 'Page not found',
      };
    }
    
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
              <MatchesContainer 
        name={matchesData?.competition || competitionName} 
        matches={matchesData?.matches || []} 
      />
      </div>
    );
  } catch (error) {
    console.error("Error fetching matches:", error);
    
    // Check if it's a "Competition not found" error
    if (error.message === 'Competition not found') {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Page Not Found</h2>
            <p className="text-gray-500 mb-6">The competition "{competitionName}" could not be found.</p>
            <a 
              href="/" 
              className="bg-[#267A54] text-white px-6 py-3 rounded-lg hover:bg-[#1E5A3D] transition-colors"
            >
              Go Home
            </a>
          </div>
        </div>
      );
    }
  }
}