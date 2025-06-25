import Competition from "@/components/Competition";

export async function generateMetadata({ params }) {
  return {
    title: `${params.competition.replace(/-/g, ' ')}`,
  };
}

export default function CompetitionDetails({ params }) {
  const competitionName = params.competition.replace(/-/g, ' ');
  
  return (
    <Competition name={competitionName} />
  );
}