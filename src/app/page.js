import Competition from "@/components/Competition";
import { getAllMatches } from "@/utils/matches";

export default async function Home() {
  const allMatches = await getAllMatches();
  const competitionsWithMatches = Object.values(allMatches).filter(
    compObj => Array.isArray(compObj.matches) && compObj.matches.length > 0
  );

  return (
    <div className="flex flex-col p-4 gap-1">
      {competitionsWithMatches.map(compObj => (
        <Competition
          key={compObj.competition}
          name={compObj.competition}
          matches={compObj.matches}
        />
      ))}
    </div>
  );
}