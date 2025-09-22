import { Button } from '@/components/ui/button';

function ActiveBet({ activeBet }) {
    const oddsTypes = ["HOME", "DRAW", "AWAY"];

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
        <div data-match-link={activeBet.matchLink} className="w-full px-3 py-2 bg-card border border-border rounded-lg">
            {/* Main Content Row */}
            <div className="flex items-center justify-between">
                {/* Left Side - Teams and Time */}
                <div className="flex-1">
                    {/* Teams */}
                    <div className="flex items-center space-x-3 mb-1">
                        <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="font-semibold text-foreground text-sm">{activeBet.homeTeam}</span>
                    </div>
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="font-semibold text-foreground text-sm">{activeBet.awayTeam}</span>
                    </div>
                    
                    {/* Time and Competition */}
                    <div className="text-xs text-muted-foreground ml-8 flex items-center gap-2">
                        <span>{formatDateTime(activeBet.dateTime)}</span>
                        <span>•</span>
                        <span>{activeBet.competition}</span>
                    </div>
                </div>

                {/* Right Side - Odds */}
                <div className="flex items-center space-x-2">
                    {oddsTypes.map((oddType, index) => (
                        <Button
                            key={oddType}
                            variant={activeBet.chosenResult === oddType ? "default" : "outline"}
                            size="sm"
                            className={`w-16 h-16 text-xs flex flex-col items-center justify-center p-2 ${
                                activeBet.chosenResult === oddType 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-transparent border-border'
                            }`}
                            disabled
                        >
                            <div className="text-xs font-medium">{oddType}</div>
                            <div className="text-xs font-bold">{activeBet.odds[index]}</div>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Bet Information */}
            <div className="mt-3 pt-3 border-t border-border">
                <div className="flex space-x-3">
                    <div className="flex-1">
                        <div className="text-xs font-medium text-muted-foreground mb-1">Wager ($)</div>
                        <div className="text-sm font-semibold text-foreground">
                            ${activeBet.wager}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-xs font-medium text-muted-foreground mb-1">Net Payout</div>
                        <div className="text-sm font-semibold text-foreground">
                            ${activeBet.netPayout}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-xs font-medium text-muted-foreground mb-1">Status</div>
                        <div className="text-sm font-semibold text-primary">
                            Active
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActiveBet;