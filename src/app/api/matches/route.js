export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const competition = searchParams.get('competition');
    const date = searchParams.get('date');

    try {
        if (competition) {
            const res = await fetch(`http://localhost:8080/matches/${encodeURIComponent(competition)}`);
            const data = await res.json();
            
            if (!res.ok) {
                return Response.json(data, { status: res.status });
            }
            
            return Response.json(data);
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