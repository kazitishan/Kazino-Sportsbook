function ActiveBet({ activeBet }) {
    const oddsTypes = ["HOME", "DRAW", "AWAY"];

    return (
        <div className="flex flex-col mb-4 p-6 bg-white shadow-lg hover:shadow-xl border border-gray-200 rounded-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center">
                <div data-match-link={activeBet.link} className="text-center w-1/4 flex flex-col justify-center space-y-2">
                    <div className="bg-gray-100 rounded-lg px-3 py-1 mb-2">
                        <p className="text-sm font-medium text-gray-700">{activeBet.competition}</p>
                    </div>
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
                        {oddsTypes.map((oddType, index) => (
                            <div 
                                key={oddType}
                                className={`w-1/3 h-28 flex flex-col items-center justify-center border-2 ${
                                    activeBet.chosenResult === oddType 
                                        ? 'border-[#09C285] bg-[#effbf6] text-[#09C285]' 
                                        : 'border-gray-200 bg-white text-gray-700'
                                } rounded-2xl px-4 py-3 font-semibold text-lg`}
                            >
                                <div className={`text-xs mb-1 ${
                                    activeBet.chosenResult === oddType ? 'text-[#09C285]' : 'text-gray-500'
                                }`}>{oddType}</div>
                                <div>{activeBet.odds[index]}</div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 w-full">
                        <div className="w-1/4">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Wager ($)</label>
                            <div className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg">
                                {activeBet.wager}
                            </div>
                        </div>

                        <div className="w-1/4">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Chosen Odds</label>
                            <div className={`inline-flex items-center justify-center px-3 py-2 text-sm rounded-full font-semibold ${
                                activeBet.chosenResult === "HOME" ? 'bg-[#09C285] text-white' : 
                                activeBet.chosenResult === "DRAW" ? 'bg-[#09C285] text-white' : 
                                activeBet.chosenResult === "AWAY" ? 'bg-[#09C285] text-white' : 
                                'bg-gray-200 text-gray-600'
                            }`}>
                                {activeBet.chosenResult || '-'}
                            </div>
                        </div>

                        <div className="w-1/4">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Potential Payout</label>
                            <div className="text-sm font-semibold text-gray-900">{activeBet.potentialPayout}</div>
                        </div>

                        <div className="w-1/4">
                            <div className="w-full bg-gray-200 text-gray-600 text-sm font-semibold py-2 px-4 rounded-lg text-center">
                                Locked
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActiveBet;