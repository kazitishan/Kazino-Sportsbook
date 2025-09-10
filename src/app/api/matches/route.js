export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const live = searchParams.get('live');
    const finished = searchParams.get('finished');

    try {
        let apiUrl = 'http://localhost:8080/matches';
        const queryParams = new URLSearchParams();
        
        if (date) queryParams.append('date', date);
        if (live !== null) queryParams.append('live', live);
        if (finished !== null) queryParams.append('finished', finished);
        
        if (queryParams.toString()) {
            apiUrl += `?${queryParams.toString()}`;
        }

        const res = await fetch(apiUrl);
        const data = await res.json();
        
        if (!res.ok) {
            return Response.json(data, { status: res.status });
        }
        
        return Response.json(data);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}