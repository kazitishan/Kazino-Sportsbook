import MatchesContainer from "@/components/MatchesContainer";
import DateNavigator from "@/components/DateNavigator";
import { getTodaysMatches, getMatchesByDate } from "@/utils/matches";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const dateParam = params?.date;
  
  let allMatches;
  
  const today = new Date();
  const todayFormatted = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${today.getFullYear()}`;
  
  if (dateParam && dateParam !== todayFormatted) {
    allMatches = await getMatchesByDate(dateParam);
  } else {
    allMatches = await getTodaysMatches();
  }

  const competitionsWithMatches = allMatches.filter(competition => 
    competition.matches && Array.isArray(competition.matches) && competition.matches.length > 0
  );

  return (
    <div className="flex flex-col p-4 gap-1">
      <div className="mb-3"><DateNavigator/></div>
      {competitionsWithMatches.map(compObj => (
        <MatchesContainer
          key={compObj.competition}
          name={compObj.competition}
          matches={compObj.matches}
        />
      ))}
    </div>
  );
}