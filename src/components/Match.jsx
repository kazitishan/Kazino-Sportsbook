"use client"
import { useState, useEffect } from 'react';
import Card from './Card';
import { useAuth } from '@/contexts/AuthContext';
import { bettingService } from '@/services/bettingService';
import Toast from './Toast';

function Match({ match, competition }) {
    const [selectedOdd, setSelectedOdd] = useState(null);
    const [wagerAmount, setWagerAmount] = useState('');
    const [netPayout, setNetPayout] = useState('$0.00');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', type: 'info', isVisible: false });

    const [hasExistingBet, setHasExistingBet] = useState(false);
    const oddsTypes = ["HOME", "DRAW", "AWAY"];
    const { user } = useAuth();

    useEffect(() => {
        if (selectedOdd && wagerAmount) {
            const oddIndex = oddsTypes.indexOf(selectedOdd);
            const payout = (parseFloat(wagerAmount) * parseFloat(match.odds[oddIndex]) - wagerAmount).toFixed(2);
            setNetPayout(`$${payout}`);
        } else {
            setNetPayout('$0.00');
        }
    }, [selectedOdd, wagerAmount]);

    useEffect(() => {
        if (user) {
            loadUserData();
        }
    }, [user]);

    const loadUserData = async () => {
        if (!user) return;
        
        try {
            const existingBet = await bettingService.hasExistingBet(user.id, match.matchLink);
            setHasExistingBet(existingBet);
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    const handleOddSelection = (oddType) => {
        setSelectedOdd(prev => prev === oddType ? null : oddType);
    };

    const handleWagerChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
            setWagerAmount(value);
        }
    };

    const handlePlaceBet = async () => {
        if (!user) {
            setToast({ message: 'Please log in to place a bet', type: 'error', isVisible: true });
            return;
        }

        setLoading(true);

        try {
            const oddIndex = oddsTypes.indexOf(selectedOdd);
            const payout = (parseFloat(wagerAmount) * parseFloat(match.odds[oddIndex]) - wagerAmount).toFixed(2);

            const result = await bettingService.placeBet({
                userId: user.id,
                competition: competition,
                dateTime: match.dateTime,
                homeTeam: match.homeTeam,
                awayTeam: match.awayTeam,
                odds: match.odds,
                wager: parseFloat(wagerAmount),
                chosenResult: selectedOdd,
                netPayout: parseFloat(payout),
                matchLink: match.matchLink
            });

            if (result.success) {
                setToast({ message: 'Bet placed successfully!', type: 'success', isVisible: true });
                setSelectedOdd(null);
                setWagerAmount('');
                setNetPayout('$0.00');
                setHasExistingBet(true);
                await loadUserData(); // Refresh user data
            } else {
                setToast({ message: result.error, type: 'error', isVisible: true });
            }
        } catch (error) {
            setToast({ message: 'An error occurred while placing your bet', type: 'error', isVisible: true });
        } finally {
            setLoading(false);
        }
    };

    const closeToast = () => {
        setToast({ message: '', type: 'info', isVisible: false });
    };

    const isBetReady = selectedOdd && wagerAmount && user && !hasExistingBet;

    return (
        <>
            <Card>
                <div data-match-link={match.matchLink} className="w-full flex flex-col items-center gap-2">

                    {/* COMPETITION */}
                    <div className="flex items-center gap-2">
                        <img src={`/competitions/${competition}.svg`} className="w-5 h-5" alt={competition} />
                        <p className="text-sm font-medium text-gray-600">{competition}</p>
                    </div>

                    {/* HOME VS AWAY */}
                    <div className='flex'>
                        <p className="font-semibold text-lg text-gray-800">{match.homeTeam}</p>
                        <span className="flex items-center mx-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">VS</span>
                        <p className="font-semibold text-lg text-gray-800">{match.awayTeam}</p>
                    </div>

                    {/* DATE */}
                    <p className="text-sm">{match.dateTime}</p>
                    
                    {/* ODDS BUTTONS */}
                    <div className="w-full flex gap-3 h-full">
                        {oddsTypes.map((oddType, index) => (
                            <button 
                                key={oddType}
                                className={`w-1/3 flex flex-col items-center justify-center border-2 ${
                                    selectedOdd === oddType 
                                        ? 'border-[#267A54] bg-green-50 text-[#267A54]' 
                                        : 'border-gray-200 text-gray-700'
                                } rounded-2xl p-4 font-semibold text-lg`}
                                onClick={() => handleOddSelection(oddType)}
                            >
                                <div className={`text-xs mb-1 ${
                                    selectedOdd === oddType ? 'text-[#267A54]' : 'text-gray-500'
                                }`}>{oddType}</div>
                                {match.odds[index]}
                            </button>
                        ))}
                    </div>

                    {/* BET INFORMATION */}
                    <div className="flex items-center gap-3 w-full">
                        {/* WAGER */}
                        <div className="w-1/3">
                            <label htmlFor={`wager-${match.matchLink}`} className="block text-xs font-medium text-gray-500 mb-1">Wager ($)</label>
                            <input
                                id={`wager-${match.matchLink}`}
                                name={`wager-${match.matchLink}`}
                                type="text"
                                inputMode="decimal"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#09C285] focus:border-transparent"
                                placeholder="$0.00"
                                value={wagerAmount}
                                onChange={handleWagerChange}
                                disabled={hasExistingBet}
                            />
                        </div>

                        {/* NET PAYOUT */}
                        <div className="w-1/3">
                            <p className="block text-xs font-medium text-gray-500 mb-1">Net Payout</p>
                            <div className="text-sm font-semibold text-gray-900 overflow-scroll">
                                {netPayout}
                            </div>
                        </div>

                        {/* PLACE BET BUTTON */}
                        <div className="w-1/3">
                            <button 
                                onClick={handlePlaceBet}
                                className={`w-full text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${
                                    isBetReady ? 'bg-[#267A54] hover:bg-[#1E5A3D]' : 'bg-gray-400 cursor-not-allowed'
                                }`}
                                disabled={!isBetReady || loading}
                            >
                                {loading ? 'Placing...' : hasExistingBet ? 'Already Bet' : 'Place Bet'}
                            </button>
                        </div>
                    </div>

                </div>
            </Card>
            
            {/* Toast Notification */}
            <Toast 
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={closeToast}
            />
        </>
    );
}

export default Match;