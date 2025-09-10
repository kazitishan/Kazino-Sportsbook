export async function GET(request, { params }) {
    const { region, competition } = await params;

    try {
        const formattedRegion = region.replace(/-/g, ' ');
        const formattedCompetition = competition.replace(/-/g, ' ');
        
        const res = await fetch(`http://localhost:8080/matches/${encodeURIComponent(formattedRegion)}/${encodeURIComponent(formattedCompetition)}`);
        const data = await res.json();
        
        if (!res.ok) {
            return Response.json(data, { status: res.status });
        }
        
        return Response.json(data);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
