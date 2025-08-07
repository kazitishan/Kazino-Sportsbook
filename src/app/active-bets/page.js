"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { bettingService } from '@/services/bettingService';
import MatchesContainer from "@/components/MatchesContainer";

export default function DisplayActiveBets() {
  const [activeBets, setActiveBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadActiveBets();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadActiveBets = async () => {
    try {
      const bets = await bettingService.getActiveBets(user.id);
      setActiveBets(bets);
    } catch (error) {
      console.error('Error loading active bets:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#267A54]"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4">
        <div className="text-center text-gray-600">
          Please log in to view your active bets.
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <MatchesContainer name="Active Bets" matches={activeBets} type="active-bets" />
    </div>
  );
}