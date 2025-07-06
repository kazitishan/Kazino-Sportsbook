export async function getResult(link) {
    const res = await fetch(`http://localhost:3000/api/result?link=${encodeURIComponent(link)}`);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}