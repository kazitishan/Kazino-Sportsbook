"use client"
import { useState, useEffect } from 'react';
import Card from './Card';

function Match({ match }) {
    const [selectedOdd, setSelectedOdd] = useState(null);
    const [wagerAmount, setWagerAmount] = useState('');
    const [potentialPayout, setPotentialPayout] = useState('$0.00');
    const oddsTypes = ["HOME", "DRAW", "AWAY"];

    useEffect(() => {
        if (selectedOdd && wagerAmount) {
            const oddIndex = oddsTypes.indexOf(selectedOdd);
            const payout = (parseFloat(wagerAmount) * parseFloat(match.odds[oddIndex])).toFixed(2);
            setPotentialPayout(`$${payout}`);
        } else {
            setPotentialPayout('$0.00');
        }
    }, [selectedOdd, wagerAmount]);

    const handleOddSelection = (oddType) => {
        setSelectedOdd(prev => prev === oddType ? null : oddType);
    };

    const handleWagerChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
            setWagerAmount(value);
        }
    };

    const isBetReady = selectedOdd && wagerAmount;

    return (
        <Card>
            <div className="flex items-center">
                <div 
                    data-match-link={match.matchLink}
                    className="text-center w-1/4 flex flex-col justify-center space-y-2"
                >
                    <p className="font-semibold text-lg text-gray-800">{match.homeTeam}</p>
                    <div className="flex items-center justify-center">
                        <div className="w-8 h-px bg-gray-300"></div>
                        <span className="mx-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">VS</span>
                        <div className="w-8 h-px bg-gray-300"></div>
                    </div>
                    <p className="font-semibold text-lg text-gray-800">{match.awayTeam}</p>
                    <p className="text-sm text-gray-600 mt-3 bg-gray-50 px-3 py-1 rounded-lg">{match.dateTime}</p>
                </div>
                
                <div className="w-3/4 flex flex-col gap-4 pl-6">
                    <div className="flex gap-3 h-full">
                        {oddsTypes.map((oddType, index) => (
                            <button 
                                key={oddType}
                                className={`w-1/3 h-28 flex flex-col items-center justify-center border-2 ${
                                    selectedOdd === oddType 
                                        ? 'border-[#09C285] bg-[#effbf6] text-[#09C285]' 
                                        : 'border-gray-200 bg-white text-gray-700'
                                } rounded-2xl px-4 py-3 font-semibold text-lg`}
                                onClick={() => handleOddSelection(oddType)}
                            >
                                <div className={`text-xs mb-1 ${
                                    selectedOdd === oddType ? 'text-[#09C285]' : 'text-gray-500'
                                }`}>{oddType}</div>
                                {match.odds[index]}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 w-full">
                        <div className="w-1/4">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Wager ($)</label>
                            <input
                                type="text"
                                inputMode="decimal"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#09C285] focus:border-transparent"
                                placeholder="$0.00"
                                value={wagerAmount}
                                onChange={handleWagerChange}
                            />
                        </div>

                        <div className="w-1/4">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Chosen Odds</label>
                            <div className={`inline-flex items-center justify-center px-3 py-2 text-sm rounded-full font-semibold ${
                                selectedOdd ? 'bg-[#09C285] text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                                {selectedOdd || '-'}
                            </div>
                        </div>

                        <div className="w-1/4">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Potential Payout</label>
                            <div className="text-sm font-semibold text-gray-900">
                                {potentialPayout}
                            </div>
                        </div>

                        <div className="w-1/4">
                            <button 
                                className={`w-full text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${
                                    isBetReady ? 'bg-[#09C285] hover:bg-[#07a572]' : 'bg-gray-400 cursor-not-allowed'
                                }`}
                                disabled={!isBetReady}
                            >
                                Place Bet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default Match;