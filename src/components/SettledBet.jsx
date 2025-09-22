import { Button } from '@/components/ui/button';

function SettledBet({ settledBet }) {
    const isWin = settledBet.chosenResult === settledBet.actualResult;
    const oddsTypes = ["HOME", "DRAW", "AWAY"];
    const netColor = isWin ? "text-green-500" : "text-red-500";

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
        <div data-match-link={settledBet.matchLink} className="w-full px-3 py-2 bg-card border border-border rounded-lg">
            {/* Main Content Row */}
            <div className="flex items-center justify-between">
                {/* Left Side - Teams and Time */}
                <div className="flex-1">
                    {/* Teams */}
                    <div className="flex items-center space-x-3 mb-1">
                        <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="font-semibold text-foreground text-sm">{settledBet.homeTeam}</span>
                    </div>
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="font-semibold text-foreground text-sm">{settledBet.awayTeam}</span>
                    </div>
                    
                    {/* Time and Competition */}
                    <div className="text-xs text-muted-foreground ml-8 flex items-center gap-2">
                        <span>{formatDateTime(settledBet.dateTime)}</span>
                        <span>•</span>
                        <span>{settledBet.competition}</span>
                    </div>
                </div>

                {/* Right Side - Odds */}
                <div className="flex items-center space-x-2">
                    {oddsTypes.map((oddType, index) => {
                        const isChosen = settledBet.chosenResult === oddType;
                        const isActual = settledBet.actualResult === oddType;
                        
                        let buttonStyle = {};
                        let buttonClass = "w-16 h-16 text-xs flex flex-col items-center justify-center p-2";
                        
                        if (isChosen && isActual) {
                            // User chose correctly - green
                            buttonStyle = {
                                backgroundColor: '#10b981',
                                color: 'white',
                                borderColor: '#10b981'
                            };
                        } else if (isChosen && !isWin) {
                            // User chose incorrectly - red
                            buttonStyle = {
                                backgroundColor: '#ef4444',
                                color: 'white',
                                borderColor: '#ef4444'
                            };
                        } else if (isActual && !isWin) {
                            // Correct answer when user lost - green
                            buttonStyle = {
                                backgroundColor: '#10b981',
                                color: 'white',
                                borderColor: '#10b981'
                            };
                        }

                        return (
                            <Button
                                key={oddType}
                                variant="outline"
                                size="sm"
                                className={buttonClass}
                                style={buttonStyle}
                                disabled
                            >
                                <div className="text-xs font-medium">{oddType}</div>
                                <div className="text-xs font-bold">{settledBet.odds[index]}</div>
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Bet Information */}
            <div className="mt-3 pt-3 border-t border-border">
                <div className="flex space-x-3">
                    <div className="flex-1">
                        <div className="text-xs font-medium text-muted-foreground mb-1">Wager</div>
                        <div className="text-sm font-semibold text-foreground">
                            {settledBet.wager}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-xs font-medium text-muted-foreground mb-1">Net Payout</div>
                        <div className={`text-sm font-semibold ${netColor}`}>
                            {settledBet.netPayout}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettledBet;