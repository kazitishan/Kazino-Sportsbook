import Competition from "@/components/Competition";

export default function CompetitionDetails({ params }) {
  const competitionName = params.competition.replace(/-/g, ' ');
  
  return (
    <Competition name={competitionName} />
  );
}