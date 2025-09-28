"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Match from "./Match";
import LiveMatch from "./LiveMatch";
import ActiveBet from "./ActiveBet";
import SettledBet from "./SettledBet";

function MatchesContainer({ region, name, matches = [], type = "matches" }) {
    const [isExpanded, setIsExpanded] = useState(true);

    let headerText = null;
    if (region != null){ headerText = `${region} - ${name}`; }
    else { headerText = `${name}`; }

    let imagePath = null;
    if (region != null) { imagePath = `/flags/${region}.svg` }
    else { imagePath = `/${name}.svg` }

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    if (!matches || matches.length === 0) {
        return (
            <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <img src={imagePath} className="w-6 h-6" alt={name} />
                            <h2 className="text-lg font-semibold text-foreground">{headerText}</h2>
                        </div>
                        <Badge variant="secondary">0</Badge>
                    </div>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="bg-card border-border space-y-0">
            <CardHeader 
                className="cursor-pointer"
                onClick={toggleExpanded}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img src={imagePath} className="w-6 h-6" alt={name} />
                        <h2 className="text-lg font-semibold text-foreground">{headerText}</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Badge variant="default">{matches.length}</Badge>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <svg
                                className={`w-4 h-4 transform transition-transform duration-200 ${
                                    isExpanded ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </Button>
                    </div>
                </div>
            </CardHeader>

            {/* Matches container */}
            {isExpanded && (
                <CardContent>
                    <div className="space-y-3">
                        {matches.map((item, index) => {
                            switch (type) {
                                case "active":
                                    return <ActiveBet key={`${name}-${index}`} activeBet={item} />;
                                case "settled":
                                    return <SettledBet key={`${name}-${index}`} settledBet={item} />;
                                default:
                                    // Check if match is live
                                    if (item.live) {
                                        return <LiveMatch key={`${name}-${index}`} match={item} competition={name} />;
                                    }
                                    return <Match key={`${name}-${index}`} match={item} competition={name} />;
                            }
                        })}
                    </div>
                </CardContent>
            )}
        </Card>
    );
}

export default MatchesContainer;