"use client";

import { useState } from 'react';
import Image from 'next/image';
import competitionsData from '../competitions.json';
import Link from "next/link";

const CompetitionsSidebar = () => {
    const [expandedSections, setExpandedSections] = useState(new Set());

    const toggleSection = (country) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(country)) {
            newExpanded.delete(country);
        } else {
            newExpanded.add(country);
        }
        setExpandedSections(newExpanded);
    };

    const formatCountryName = (country) => {
        return country.charAt(0).toUpperCase() + country.slice(1);
    };

    return (
        <div className="w-80 h-screen p-4 space-y-2">
            {Object.entries(competitionsData).map(([country, competitions]) => (
                <div key={country} className="last:border-b-0">
                    <button
                        onClick={() => toggleSection(country)}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-300 transition-colors duration-200 rounded-lg"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 relative overflow-hidden rounded-sm flex items-center justify-center">
                                <Image
                                    src={`/flags/${country}.svg`}
                                    alt={`${formatCountryName(country)} flag`}
                                    width={24}
                                    height={24}
                                    className="object-cover"
                                />
                            </div>
                            
                            <span className="font-medium text-sm">
                                {formatCountryName(country)}
                            </span>
                        </div>
                                
                        <svg
                            className={`w-4 h-4 transform transition-transform duration-200 ${
                                expandedSections.has(country) ? 'rotate-180' : ''
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
                    </button>

                    {expandedSections.has(country) && (
                        <div className="ml-4 pb-3 space-y-1">
                            {competitions.map((competition) => (
                                <Link
                                    key={competition}
                                    className="w-full flex items-center space-x-3 p-2 hover:bg-gray-300 rounded-md transition-colors duration-200 text-left"
                                    href={`/${competition.replace(/\s+/g, '-')}`} 
                                >
                                    <div className="w-6 h-6 relative rounded-sm flex items-center justify-center flex-shrink-0">
                                        <Image
                                            src={`/competitions/${competition}.svg`}
                                            alt={`${competition} logo`}
                                            width={24}
                                            height={24}
                                            className="object-contain"
                                        />
                                    </div>
                                            
                                    <span className="text-sm">
                                        {competition}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CompetitionsSidebar;