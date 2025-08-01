import Card from "./Card";

function ActiveBet({ activeBet }) {
    const oddsTypes = ["HOME", "DRAW", "AWAY"];

    return (
        <Card>
            <div data-match-link={activeBet.link} className="w-full flex flex-col items-center gap-2">
                {/* HOME VS AWAY */}
                <div className='flex'>
                    <p className="font-semibold text-lg text-gray-800">{activeBet.homeTeam}</p>
                    <span className="flex items-center mx-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">VS</span>
                    <p className="font-semibold text-lg text-gray-800">{activeBet.awayTeam}</p>
                </div>

                {/* DATE */}
                <p className="text-sm">{activeBet.dateTime}</p>

                {/* COMPETITION */}
                <p className="text-sm">{activeBet.competition}</p>
                
                {/* ODDS BUTTONS */}
                <div className="w-full flex gap-3 h-full">
                    {oddsTypes.map((oddType, index) => (
                        <div 
                            key={oddType}
                            className={`w-1/3 flex flex-col items-center justify-center border-2 ${
                                activeBet.chosenResult === oddType 
                                    ? 'border-[#267A54] bg-green-50 text-[#267A54]' 
                                    : 'border-gray-200 text-gray-700'
                            } rounded-2xl p-4 font-semibold text-lg`}
                        >
                            <div className={`text-xs mb-1 ${
                                activeBet.chosenResult === oddType ? 'text-[#267A54]' : 'text-gray-500'
                            }`}>{oddType}</div>
                            {activeBet.odds[index]}
                        </div>
                    ))}
                </div>

                {/* BET INFORMATION */}
                <div className="flex items-center gap-3 w-full">
                    {/* WAGER */}
                    <div className="w-1/2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Wager ($)</label>
                        <div className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg">
                            {activeBet.wager}
                        </div>
                    </div>

                    {/* NET PAYOUT */}
                    <div className="w-1/2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Net Payout</label>
                        <div className="text-sm font-semibold text-gray-900 overflow-scroll">
                            {activeBet.netPayout}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default ActiveBet;