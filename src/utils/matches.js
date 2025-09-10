export async function getMatchesByCompetition(competition) {
    const res = await fetch(`http://localhost:3000/api/matches?competition=${encodeURIComponent(competition)}`);
    if (!res.ok) {
        if (res.status === 404) {
            throw new Error('Competition not found');
        }
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    // Return the matches array from the competition object
    return data.matches || [];
}
  
export async function getAllMatches() {
    const res = await fetch('http://localhost:3000/api/matches');
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    // Flatten all matches from all competitions into a single array
    const allMatches = [];
    data.forEach(competition => {
        if (competition.matches && Array.isArray(competition.matches)) {
            allMatches.push(...competition.matches);
        }
    });
    return allMatches;
}

export async function getMatchesByDate(date) {
    const res = await fetch(`http://localhost:3000/api/matches?date=${encodeURIComponent(date)}`);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    // Flatten all matches from all competitions for the specific date into a single array
    const allMatches = [];
    data.forEach(competition => {
        if (competition.matches && Array.isArray(competition.matches)) {
            allMatches.push(...competition.matches);
        }
    });
    return allMatches;
}

// New utility functions for working with the nested structure
export async function getAllCompetitions() {
    const res = await fetch('http://localhost:3000/api/matches');
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    // Return the full nested structure with regions and competitions
    return data;
}

export async function getMatchesByRegion(region) {
    const res = await fetch('http://localhost:3000/api/matches');
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    // Find competitions in the specified region
    const regionCompetitions = data.filter(competition => 
        competition.region.toLowerCase() === region.toLowerCase()
    );
    return regionCompetitions;
}