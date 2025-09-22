"use client"
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
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

    // Format date and time
    const formatDateTime = (dateTime) => {
        if (!dateTime || dateTime === 'Date not available') return 'TBD';
        const match = dateTime.match(/^(\d{2}-\d{2}-\d{4})\s+(.+)$/);
        if (match) {
            const [, date, time] = match;
            const [month, day, year] = date.split('-');
            const dateObj = new Date(year, month - 1, day);
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
            return `${dayName} ${month}/${day} • ${time}`;
        }
        return dateTime;
    };

    return (
        <>
            <Card>
                <CardContent className="p-2">
                {/* Main Content Row */}
                <div className="flex items-center justify-between">
                    {/* Left Side - Teams and Time */}
                    <div className="flex-1">
                        {/* Teams */}
                        <div className="flex items-center space-x-3 mb-1">
                            <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                            </div>
                            <span className="font-semibold text-foreground text-sm">{match.homeTeam}</span>
                        </div>
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                            </div>
                            <span className="font-semibold text-foreground text-sm">{match.awayTeam}</span>
                        </div>
                        
                        {/* Time and Competition */}
                        <div className="text-xs text-muted-foreground ml-8 flex items-center gap-2">
                            <span>{formatDateTime(match.dateTime)}</span>
                            <span>•</span>
                            <span>{competition}</span>
                        </div>
                    </div>

                    {/* Right Side - Odds */}
                    <div className="flex items-center space-x-2">
                        {oddsTypes.map((oddType, index) => (
                            <Button
                                key={oddType}
                                variant={selectedOdd === oddType ? "default" : "outline"}
                                size="sm"
                                className={`w-16 h-16 text-xs flex flex-col items-center justify-center p-2 ${
                                    selectedOdd === oddType 
                                        ? 'bg-primary text-primary-foreground' 
                                        : 'bg-transparent border-border hover:bg-muted'
                                }`}
                                onClick={() => handleOddSelection(oddType)}
                                disabled={hasExistingBet}
                            >
                                <div className="text-xs font-medium">{oddType}</div>
                                <div className="text-xs font-bold">{match.odds[index]}</div>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Betting Controls */}
                {selectedOdd && (
                    <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex space-x-3 items-center">
                            <div className="flex-1">
                                <label htmlFor={`wager-${match.matchLink}`} className="block text-xs font-medium text-muted-foreground mb-1">
                                    Wager ($)
                                </label>
                                <input
                                    id={`wager-${match.matchLink}`}
                                    type="text"
                                    inputMode="decimal"
                                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                                    placeholder="$0.00"
                                    value={wagerAmount}
                                    onChange={handleWagerChange}
                                    disabled={hasExistingBet}
                                />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-medium text-muted-foreground mb-1">Net Payout</div>
                                <div className="text-sm font-semibold text-foreground">
                                    {netPayout}
                                </div>
                            </div>
                            <div className="flex-1">
                                <Button 
                                    onClick={handlePlaceBet}
                                    className="w-full"
                                    disabled={!isBetReady || loading}
                                >
                                    {loading ? 'Placing...' : hasExistingBet ? 'Already Bet' : 'Place Bet'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                </CardContent>
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