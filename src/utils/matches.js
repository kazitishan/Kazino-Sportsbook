export async function getTodaysMatches() {
    const res = await fetch('http://localhost:3000/api/matches?finished=false');
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

export async function getMatchesByRegion(region) {
    const res = await fetch(`http://localhost:3000/api/matches/${encodeURIComponent(region)}`);
    if (!res.ok) {
        if (res.status === 404) {
            throw new Error('Region not found');
        }
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}

export async function getMatchesByCompetition(region, competition) {
    const res = await fetch(`http://localhost:3000/api/matches/${encodeURIComponent(region)}/${encodeURIComponent(competition)}`);
    if (!res.ok) {
        if (res.status === 404) {
            throw new Error('Competition not found');
        }
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}

export async function getLiveMatches() {
    const res = await fetch('http://localhost:3000/api/matches?live=true');
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}