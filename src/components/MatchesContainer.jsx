"use client";

import { useState } from "react";
import Match from "./Match";
import ActiveBet from "./ActiveBet";
import SettledBet from "./SettledBet";

function MatchesContainer({ name, matches = [], type = "matches" }) {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    if (!matches || matches.length === 0) {
        return (
            <div className="flex items-center p-6 bg-white shadow-lg rounded-2xl border border-gray-100">
                <img src={`/competitions/${name}.svg`} className="w-8 h-8" />
                <h1 className="text-xl font-bold mx-6 text-gray-800">{name}</h1>
                <div className="bg-gray-200 text-gray-600 text-sm font-medium px-3 py-1 rounded-full">0</div>
            </div>
        );
    }

    return (
        <>
            <div 
                className="flex items-center p-6 bg-white shadow-lg hover:bg-gray-100 rounded-2xl cursor-pointer transition-colors duration-200 border border-gray-100"
                onClick={toggleExpanded}
            >
                <img src={`/competitions/${name}.svg`} className="w-8 h-8" />
                <h1 className="text-xl font-bold mx-6 flex-1 text-gray-800">{name}</h1>
                <div className="bg-[#267A54] text-white text-sm font-medium px-3 py-1 rounded-full mr-4">
                    {matches.length}
                </div>
                
                {/* Toggle arrow */}
                <svg
                    className={`w-6 h-6 transform transition-transform duration-200 text-gray-600 ${
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
            </div>

            {/* Matches container */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? 'opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {matches.map((item, index) => {
                        switch (type) {
                            case "active":
                                return <ActiveBet key={`${name}-${index}`} activeBet={item} />;
                            case "settled":
                                return <SettledBet key={`${name}-${index}`} settledBet={item} />;
                            default:
                                return <Match key={`${name}-${index}`} match={item} />;
                        }
                    })}
                </div>
            </div>
        </>
    );
}

export default MatchesContainer;