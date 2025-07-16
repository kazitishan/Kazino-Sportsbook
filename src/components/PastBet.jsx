function PastBet({ pastBet }) {
    const isWin = pastBet.chosenResult == pastBet.actualResult;
    const oddsTypes = ["HOME", "DRAW", "AWAY"];
    const netColor = isWin ? "text-[#09C285]" : "text-red-500";

    return (
        <div className="flex flex-col mb-4 p-6 bg-white shadow-lg hover:shadow-xl border border-gray-200 rounded-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center">
                <div className="text-center w-1/4 flex flex-col justify-center space-y-2">
                    <div className="bg-gray-100 rounded-lg px-3 py-1 mb-2">
                        <p className="text-sm font-medium text-gray-700">{pastBet.competition}</p>
                    </div>
                    <p className="font-semibold text-lg text-gray-800">{pastBet.homeTeam}</p>
                    <div className="flex items-center justify-center">
                        <div className="w-8 h-px bg-gray-300"></div>
                        <span className="mx-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">VS</span>
                        <div className="w-8 h-px bg-gray-300"></div>
                    </div>
                    <p className="font-semibold text-lg text-gray-800">{pastBet.awayTeam}</p>
                    <p className="text-sm text-gray-600 mt-3 bg-gray-50 px-3 py-1 rounded-lg">{pastBet.dateTime}</p>
                </div>
                
                <div className="w-3/4 flex flex-col gap-4 pl-6">
                    <div className="flex gap-3 h-full">
                        {oddsTypes.map((oddType, index) => (
                            <div 
                                key={oddType}
                                className={`w-1/3 h-28 flex flex-col items-center justify-center border-2 ${
                                    pastBet.chosenResult === oddType 
                                        ? isWin 
                                            ? 'border-[#09C285] bg-[#effbf6] text-[#09C285]' 
                                            : 'border-red-500 bg-red-50 text-red-500'
                                        : 'border-gray-200 bg-white text-gray-700'
                                } rounded-2xl px-4 py-3 font-semibold text-lg`}
                            >
                                <div className={`text-xs mb-1 ${
                                    pastBet.chosenResult === oddType 
                                        ? isWin ? 'text-[#09C285]' : 'text-red-500'
                                        : 'text-gray-500'
                                }`}>{oddType}</div>
                                <div>{pastBet.odds[index]}</div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 w-full">
                        <div className="w-1/4">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Wager ($)</label>
                            <div className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg">
                                {pastBet.wager}
                            </div>
                        </div>

                        <div className="w-1/4">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Chosen Odds</label>
                            <div className='inline-flex items-center justify-center px-3 py-2 text-sm rounded-full font-semibold bg-[#09C285] text-white'>
                                {pastBet.chosenResult || '-'}
                            </div>
                        </div>

                        <div className="w-1/4">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Actual Result</label>
                            <div className="inline-flex items-center justify-center px-3 py-2 text-sm rounded-full font-semibold bg-[#09C285] text-white">
                                {pastBet.actualResult || '-'}
                            </div>
                        </div>

                        <div className="w-1/4">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Net Payout</label>
                            <div className={`text-sm font-semibold ${netColor}`}>
                                {pastBet.net}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PastBet;