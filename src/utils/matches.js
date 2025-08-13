export async function getMatchesByCompetition(competition) {
    const res = await fetch(`http://localhost:3000/api/matches?competition=${encodeURIComponent(competition)}`);
    if (!res.ok) {
        if (res.status === 404) {
            throw new Error('Competition not found');
        }
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}
  
export async function getAllMatches() {
    const res = await fetch('http://localhost:3000/api/matches');
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}

export async function getMatchesByDate(date) {
    const res = await fetch(`http://localhost:3000/api/matches?date=${encodeURIComponent(date)}`);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}