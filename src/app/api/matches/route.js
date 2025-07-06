export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const competition = searchParams.get('competition');

    try {
        if (competition){
            const res = await fetch(`http://localhost:8080/matches/${encodeURIComponent(competition)}`);
            const data = await res.json();
            return Response.json(data);
        } else {
            const res = await fetch('http://localhost:8080/matches');
            const data = await res.json();
            return Response.json(data); 
        }
    } catch (error){
        return Response.json({ error: error.message }, { status: 500 });
    }
}