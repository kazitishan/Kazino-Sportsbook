"use client";

import { useState, useEffect } from 'react';
import MatchesContainer from "@/components/MatchesContainer";
import DateNavigator from "@/components/DateNavigator";
import { getTodaysMatches, getMatchesByDate, getLiveMatches } from "@/utils/matches";

export default function Home({ searchParams }) {
  const [allMatches, setAllMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiveMode, setIsLiveMode] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const params = await searchParams;
        const dateParam = params?.date;
        const liveParam = params?.live === 'true';
        
        setIsLiveMode(liveParam);
        
        const today = new Date();
        const todayFormatted = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${today.getFullYear()}`;
        
        let matches;
        if (liveParam && (!dateParam || dateParam === todayFormatted)) {
          matches = await getLiveMatches();
          setLiveMatches(matches);
        } else {
          if (dateParam && dateParam !== todayFormatted) {
            matches = await getMatchesByDate(dateParam);
          } else {
            matches = await getTodaysMatches();
          }
          setAllMatches(matches);
          setLiveMatches(null);
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [searchParams]);

  const competitionsWithMatches = (liveMatches || allMatches).filter(competition => 
    competition.matches && Array.isArray(competition.matches) && competition.matches.length > 0
  );

  if (loading) {
    return (
      <div className="flex flex-col p-6 space-y-4">
        <div className="mb-4">
          <DateNavigator />
        </div>
        <div className="text-center py-8">Loading matches...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 space-y-4">
      <div className="mb-4">
        <DateNavigator />
      </div>
      {competitionsWithMatches.map(compObj => (
        <MatchesContainer
          key={`${compObj.region}-${compObj.competition}`}
          region={compObj.region}
          name={compObj.competition}
          matches={compObj.matches}
        />
      ))}
    </div>
  );
}