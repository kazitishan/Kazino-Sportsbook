"use client"
import { useState, useEffect } from 'react';
import Card from './Card';

function Match({ match }) {
    const [selectedOdd, setSelectedOdd] = useState(null);
    const [wagerAmount, setWagerAmount] = useState('');
    const [netPayout, setNetPayout] = useState('$0.00');
    const oddsTypes = ["HOME", "DRAW", "AWAY"];

    useEffect(() => {
        if (selectedOdd && wagerAmount) {
            const oddIndex = oddsTypes.indexOf(selectedOdd);
            const payout = (parseFloat(wagerAmount) * parseFloat(match.odds[oddIndex]) - wagerAmount).toFixed(2);
            setNetPayout(`$${payout}`);
        } else {
            setNetPayout('$0.00');
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
            <div data-match-link={match.matchLink} className="w-full flex flex-col items-center gap-2">

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
                                    ? 'border-[#09C285] bg-[#effbf6] text-[#09C285]' 
                                    : 'border-gray-200 bg-white text-gray-700'
                            } rounded-2xl p-4 font-semibold text-lg`}
                            onClick={() => handleOddSelection(oddType)}
                        >
                            <div className={`text-xs mb-1 ${
                                selectedOdd === oddType ? 'text-[#09C285]' : 'text-gray-500'
                            }`}>{oddType}</div>
                            {match.odds[index]}
                        </button>
                    ))}
                </div>

                {/* BET INFORMATION */}
                <div className="flex items-center gap-3 w-full">
                    {/* WAGER */}
                    <div className="w-1/3">
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

                    {/* NET PAYOUT */}
                    <div className="w-1/3">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Net Payout</label>
                        <div className="text-sm font-semibold text-gray-900 overflow-scroll">
                            {netPayout}
                        </div>
                    </div>

                    {/* PLACE BET BUTTON */}
                    <div className="w-1/3">
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
        </Card>
    );
}

export default Match;