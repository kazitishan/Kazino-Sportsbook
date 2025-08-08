"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { bettingService } from '@/services/bettingService';
import MatchesContainer from "@/components/MatchesContainer";
import Toast from "@/components/Toast";

export default function DisplayActiveBets() {
  const [activeBets, setActiveBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settling, setSettling] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', isVisible: false });
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
      showToast('Error loading active bets', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSettleBets = async () => {
    if (!user) return;

    setSettling(true);
    showToast('Settling bets... This may take a few moments.', 'info');

    try {
      const result = await bettingService.settleBets(user.id);
      
      if (result.success) {
        if (result.settledCount > 0) {
          showToast(`Successfully settled ${result.settledCount} bets!`, 'success');
          // Reload active bets to reflect changes
          await loadActiveBets();
        } else {
          showToast('No bets could be settled at this time.', 'info');
        }
        
        if (result.errors && result.errors.length > 0) {
          console.error('Some errors occurred during settlement:', result.errors);
        }
      } else {
        showToast(`Error settling bets: ${result.error}`, 'error');
      }
    } catch (error) {
      console.error('Error in settlement process:', error);
      showToast('Error settling bets. Please try again.', 'error');
    } finally {
      setSettling(false);
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast({ message: '', type: '', isVisible: false });
    }, 5000);
  };

  const closeToast = () => {
    setToast({ message: '', type: '', isVisible: false });
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
      {/* Settle Bets Button */}
      <div className="mb-4 flex justify-center">
        <button
          onClick={handleSettleBets}
          disabled={settling || activeBets.length === 0}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-300 ${
            settling || activeBets.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#267A54] hover:bg-[#1E5A3D]'
          }`}
        >
          {settling ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Settling Bets...
            </div>
          ) : (
            'Settle Bets'
          )}
        </button>
      </div>

      {/* Active Bets Container */}
      <MatchesContainer name="Active Bets" matches={activeBets} type="active-bets" />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </div>
  );
}