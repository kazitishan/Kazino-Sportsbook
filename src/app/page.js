import MatchesContainer from "@/components/MatchesContainer";
import DateNavigator from "@/components/DateNavigator";
import { getAllMatches, getMatchesByDate } from "@/utils/matches";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const dateParam = params?.date;
  
  let allMatches;
  if (dateParam) {
    allMatches = await getMatchesByDate(dateParam);
  } else {
    allMatches = await getAllMatches();
  }

  const competitionsWithMatches = Object.values(allMatches).filter(
    compObj => Array.isArray(compObj.matches) && compObj.matches.length > 0
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