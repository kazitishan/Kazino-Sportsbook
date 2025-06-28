"use client"
import { useState } from 'react';

function ActiveBet({ activeBet }) {
    const [showEditOverlay, setShowEditOverlay] = useState(false);

    return (
        <>
            <div className="flex flex-col mb-4 p-6 bg-white shadow-lg hover:shadow-xl border border-gray-200 rounded-2xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center">
                    <div className={`${activeBet.link} text-center w-1/4 flex flex-col justify-center space-y-2`}>
                        <p className="font-semibold text-lg text-gray-800">{activeBet.homeTeam}</p>
                        <div className="flex items-center justify-center">
                            <div className="w-8 h-px bg-gray-300"></div>
                            <span className="mx-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">VS</span>
                            <div className="w-8 h-px bg-gray-300"></div>
                        </div>
                        <p className="font-semibold text-lg text-gray-800">{activeBet.awayTeam}</p>
                        <p className="text-sm text-gray-600 mt-3 bg-gray-50 px-3 py-1 rounded-lg">{activeBet.dateTime}</p>
                    </div>
                    
                    <div className="w-3/4 flex flex-col gap-4 pl-6">
                        <div className="flex gap-3 h-full">
                            <div className={`w-1/3 h-28 flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 border-2 ${activeBet.chosenResult === "Home" ? "border-[#09C285]" : "border-blue-200"} rounded-2xl px-4 py-3`}>
                                <div className="text-xs text-gray-500 mb-1">HOME</div>
                                <div className="font-semibold text-lg text-gray-700">{activeBet.odds[0]}</div>
                            </div>
                            <div className={`w-1/3 h-28 flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 border-2 ${activeBet.chosenResult === "Draw" ? "border-[#09C285]" : "border-gray-200"} rounded-2xl px-4 py-3`}>
                                <div className="text-xs text-gray-500 mb-1">DRAW</div>
                                <div className="font-semibold text-lg text-gray-700">{activeBet.odds[1]}</div>
                            </div>
                            <div className={`w-1/3 h-28 flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 border-2 ${activeBet.chosenResult === "Away" ? "border-[#09C285]" : "border-red-200"} rounded-2xl px-4 py-3`}>
                                <div className="text-xs text-gray-500 mb-1">AWAY</div>
                                <div className="font-semibold text-lg text-gray-700">{activeBet.odds[2]}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full">
                            <div className="w-1/4">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Wager</label>
                                <div className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg">
                                    {activeBet.wager}
                                </div>
                            </div>

                            <div className="w-1/4">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Chosen Result</label>
                                <div className={`inline-flex items-center justify-center px-3 py-2 text-sm rounded-full font-semibold ${
                                    activeBet.chosenResult === "Home" ? "bg-blue-100 text-blue-800" :
                                    activeBet.chosenResult === "Draw" ? "bg-gray-100 text-gray-800" :
                                    "bg-red-100 text-red-800"
                                }`}>
                                    {activeBet.chosenResult}
                                </div>
                            </div>

                            <div className="w-1/4">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Potential Payout</label>
                                <div className="text-sm font-semibold text-gray-900">{activeBet.potentialPayout}</div>
                            </div>

                            <div className="w-1/4">
                                <button 
                                    className="w-full bg-[#09C285] hover:bg-[#07a572] text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                                    onClick={() => setShowEditOverlay(true)}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Overlay */}
            {showEditOverlay && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Edit Bet</h3>
                            <button 
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowEditOverlay(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="py-4">
                            <p className="text-gray-500 text-center py-8">Edit form will go here</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ActiveBet;