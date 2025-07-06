import Competition from "@/components/Competition";

export async function generateMetadata({ params }) {
  const competitionName = params.competition.replace(/-/g, ' ');
  
  return {
    title: `${competitionName} | Kazino Sportsbook`,
  };
}

export default function CompetitionDetails({ params }) {
  const competitionName = params.competition.replace(/-/g, ' ');
  
  return (
    <Competition name={competitionName} />
  );
}