export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const link = searchParams.get('link');

    try {
        const res = await fetch(`http://localhost:8080/result?link=${encodeURIComponent(link)}`);
        const data = await res.json();
        
        // Inherit the status code from the API response
        return Response.json(data, { status: res.status });
    } catch (error){
        return Response.json({ error: error.message }, { status: 500 });
    }
}