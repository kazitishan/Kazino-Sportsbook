"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("http://localhost:8080/matches/fifa club world cup");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMatches(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching matches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <div>Loading matches...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!matches) {
    return <div>No matches found</div>;
  }

  return (
    <div>
      <h1>{matches.competition}</h1>
      <div>
        {matches.matches.map((match, index) => (
          <div key={index} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
            <h3>{match.homeTeam} vs {match.awayTeam}</h3>
            <p>Date: {match.dateTime}</p>
            <p>Odds: 
              Home: {match.odds[0]} | 
              Draw: {match.odds[1]} | 
              Away: {match.odds[2]}
            </p>
            <a href={match.matchLink}>Match details</a>
          </div>
        ))}
      </div>
    </div>
  );
}