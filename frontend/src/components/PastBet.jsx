function PastBet({ pastBet }) {
    const isWin = pastBet.chosenResult === pastBet.actualResult;
    const netColor = isWin ? "text-[#09C285]" : "text-red-500";

    return (
        <div className="flex flex-col mb-4 p-6 bg-white shadow-lg hover:shadow-xl border border-gray-200 rounded-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center">
                {/* Left side */}
                <div className="w-1/2 pr-4 border-r border-gray-100">
                    <div className="flex items-center mb-3">
                        <div className="bg-gray-100 rounded-lg px-3 py-1">
                            <p className="text-sm font-medium text-gray-700">{pastBet.competition}</p>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex flex-col items-center">
                            <p className="font-semibold text-lg text-gray-800">{pastBet.homeTeam}</p>
                            <div className="flex items-center justify-center my-2">
                                <div className="w-8 h-px bg-gray-300"></div>
                                <span className="mx-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">VS</span>
                                <div className="w-8 h-px bg-gray-300"></div>
                            </div>
                            <p className="font-semibold text-lg text-gray-800">{pastBet.awayTeam}</p>
                        </div>
                        
                        <div className="flex justify-center gap-4 mt-4">
                            <div className="text-center border-2 border-blue-200 rounded-lg px-3 py-2">
                                <p className="text-xs text-gray-500 mb-1">Home</p>
                                <p className="font-medium">{pastBet.odds[0]}</p>
                            </div>
                            <div className="text-center border-2 border-gray-200 rounded-lg px-3 py-2">
                                <p className="text-xs text-gray-500 mb-1">Draw</p>
                                <p className="font-medium">{pastBet.odds[1]}</p>
                            </div>
                            <div className="text-center border-2 border-red-200 rounded-lg px-3 py-2">
                                <p className="text-xs text-gray-500 mb-1">Away</p>
                                <p className="font-medium">{pastBet.odds[2]}</p>
                            </div>
                        </div>
                        
                        <div className="mt-3 text-center">
                            <p className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-lg inline-block">
                                {pastBet.dateTime}
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Right side */}
                <div className="w-1/2 pl-6">
                    <div className="flex flex-col gap-4 h-full">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">Wager</p>
                            <p className="font-semibold">{pastBet.wager}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">Chosen Result</p>
                            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                pastBet.chosenResult === "Home" ? "bg-blue-100 text-blue-800" :
                                pastBet.chosenResult === "Draw" ? "bg-gray-100 text-gray-800" :
                                "bg-red-100 text-red-800"
                            }`}>
                                {pastBet.chosenResult}
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">Actual Result</p>
                            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                pastBet.actualResult === "Home" ? "bg-blue-100 text-blue-800" :
                                pastBet.actualResult === "Draw" ? "bg-gray-100 text-gray-800" :
                                "bg-red-100 text-red-800"
                            }`}>
                                {pastBet.actualResult}
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">Potential Payout</p>
                            <p className="font-semibold">{pastBet.potentialPayout}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">Actual Payout</p>
                            <p className={`font-semibold ${isWin ? "text-[#09C285]" : "text-red-500"}`}>{pastBet.actualPayout}</p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <p className="text-sm font-medium text-gray-500">Net Result</p>
                            <p className={`font-semibold text-lg ${netColor}`}>{pastBet.net}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PastBet;