import Card from "./Card";

function PastBet({ pastBet }) {
    const isWin = pastBet.chosenResult === pastBet.actualResult;
    const oddsTypes = ["HOME", "DRAW", "AWAY"];
    const netColor = isWin ? "text-[#267A54]" : "text-red-500";

    return (
        <Card className="w-full">
            <div data-match-link={pastBet.link} className="w-full flex flex-col items-center gap-2">
                {/* HOME VS AWAY */}
                <div className='flex'>
                    <p className="font-semibold text-lg text-gray-800">{pastBet.homeTeam}</p>
                    <span className="flex items-center mx-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">VS</span>
                    <p className="font-semibold text-lg text-gray-800">{pastBet.awayTeam}</p>
                </div>

                {/* DATE */}
                <p className="text-sm">{pastBet.dateTime}</p>

                {/* COMPETITION */}
                <p className="text-sm">{pastBet.competition}</p>
                
                {/* ODDS BUTTONS */}
                <div className="w-full flex gap-3 h-full">
                    {oddsTypes.map((oddType, index) => {
                        const isChosen = pastBet.chosenResult === oddType;
                        const isActual = pastBet.actualResult === oddType;
                        
                        let boxStyle = 'border-gray-200 bg-white text-gray-700';
                        let textStyle = 'text-gray-500';
                        
                        if (isChosen && isActual) {
                            boxStyle = 'border-[#267A54] bg-green-50 text-[#267A54]';
                            textStyle = 'text-[#267A54]';
                        } else if (isChosen && !isWin) {
                            boxStyle = 'border-red-500 bg-red-50 text-red-500';
                            textStyle = 'text-red-500';
                        } else if (isActual && !isWin) {
                            boxStyle = 'border-[#267A54] bg-green-50 text-[#267A54]';
                            textStyle = 'text-[#267A54]';
                        }

                        return (
                            <div 
                                key={oddType}
                                className={`w-1/3 flex flex-col items-center justify-center border-2 ${boxStyle} rounded-2xl p-4 font-semibold text-lg`}
                            >
                                <div className={`text-xs mb-1 ${textStyle}`}>{oddType}</div>
                                {pastBet.odds[index]}
                            </div>
                        );
                    })}
                </div>

                {/* BET INFORMATION */}
                <div className="flex items-center gap-3 w-full">
                    {/* WAGER */}
                    <div className="w-1/2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Wager ($)</label>
                        <div className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg">
                            {pastBet.wager}
                        </div>
                    </div>

                    {/* NET PAYOUT */}
                    <div className="w-1/2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Net Payout</label>
                        <div className={`text-sm font-semibold ${netColor}`}>
                            {pastBet.netPayout}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default PastBet;