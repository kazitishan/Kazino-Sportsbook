export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const competition = searchParams.get('competition');
    const date = searchParams.get('date');

    try {
        if (competition) {
            // For competition-specific requests, we need to search through all regions
            const res = await fetch('http://localhost:8080/matches');
            const data = await res.json();
            
            if (!res.ok) {
                return Response.json(data, { status: res.status });
            }
            
            // Find the competition across all regions
            const foundCompetition = data.find(region => 
                region.competition.toLowerCase() === competition.toLowerCase()
            );
            
            if (!foundCompetition) {
                return Response.json({ error: 'Competition not found' }, { status: 404 });
            }
            
            return Response.json(foundCompetition);
        } else if (date) {
            const res = await fetch(`http://localhost:8080/matches?date=${encodeURIComponent(date)}`);
            const data = await res.json();
            
            if (!res.ok) {
                return Response.json(data, { status: res.status });
            }
            
            return Response.json(data);
        } else {
            const res = await fetch('http://localhost:8080/matches');
            const data = await res.json();
            
            if (!res.ok) {
                return Response.json(data, { status: res.status });
            }
            
            return Response.json(data); 
        }
    } catch (error){
        return Response.json({ error: error.message }, { status: 500 });
    }
}