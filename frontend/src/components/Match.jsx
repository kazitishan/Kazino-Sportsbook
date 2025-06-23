function Match({ match }) {
    return (
        <div className="flex flex-col mb-4 p-6 bg-white shadow-lg hover:shadow-xl border border-gray-200 rounded-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center">
                <div className={`${match.matchLink} text-center w-1/4 flex flex-col justify-center space-y-2`}>
                    <p className="font-semibold text-lg text-gray-800">{match.homeTeam}</p>
                    <div className="flex items-center justify-center">
                        <div className="w-8 h-px bg-gray-300"></div>
                        <span className="mx-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">VS</span>
                        <div className="w-8 h-px bg-gray-300"></div>
                    </div>
                    <p className="font-semibold text-lg text-gray-800">{match.awayTeam}</p>
                    <p className="text-sm text-gray-600 mt-3 bg-gray-50 px-3 py-1 rounded-lg">{match.dateTime}</p>
                </div>
                <div className="w-3/4 flex gap-3 items-stretch h-full pl-6">
                    <button className="w-1/3 h-28 bg-gradient-to-b from-white to-gray-50 border-2 border-blue-200 hover:border-[#09C285] hover:bg-gradient-to-b hover:from-[#09C285] hover:to-[#07a572] text-gray-700 hover:text-white px-4 py-3 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 font-semibold text-lg">
                        <div className="text-xs text-gray-500 hover:text-white/80 mb-1">HOME</div>
                        {match.odds[0]}
                    </button>
                    <button className="w-1/3 h-28 bg-gradient-to-b from-white to-gray-50 border-2 border-gray-200 hover:border-[#09C285] hover:bg-gradient-to-b hover:from-[#09C285] hover:to-[#07a572] text-gray-700 hover:text-white px-4 py-3 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 font-semibold text-lg">
                        <div className="text-xs text-gray-500 hover:text-white/80 mb-1">DRAW</div>
                        {match.odds[1]}
                    </button>
                    <button className="w-1/3 h-28 bg-gradient-to-b from-white to-gray-50 border-2 border-red-200 hover:border-[#09C285] hover:bg-gradient-to-b hover:from-[#09C285] hover:to-[#07a572] text-gray-700 hover:text-white px-4 py-3 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 font-semibold text-lg">
                        <div className="text-xs text-gray-500 hover:text-white/80 mb-1">AWAY</div>
                        {match.odds[2]}
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                <div className="w-1/4 px-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Wager</label>
                    <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#09C285] focus:border-transparent"
                        placeholder="$0.00"
                    />
                </div>

                <div className="w-1/4 px-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chosen Odds</label>
                    <div className="inline-flex items-center justify-center px-3 py-2 bg-[#09C285] text-white rounded-full font-semibold">
                        -
                    </div>
                </div>

                <div className="w-1/4 px-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Potential Payout</label>
                    <div className="text-lg font-semibold text-gray-900">$0.00</div>
                </div>

                <div className="w-1/4 px-2">
                    <button className="w-full bg-[#09C285] hover:bg-[#07a572] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                        Place Bet
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Match;