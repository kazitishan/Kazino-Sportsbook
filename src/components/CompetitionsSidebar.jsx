"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import competitionsData from '../competitions.json';

const CompetitionsSidebar = ({ onLinkClick, isMobile = false }) => {
    const [expandedSections, setExpandedSections] = useState(new Set());

    // Mapping for top leagues to their correct region/competition paths
    const topLeaguesMapping = {
        'Premier League': { region: 'england', competition: 'premier-league' },
        'Champions League': { region: 'europe', competition: 'champions-league' },
        'LaLiga': { region: 'spain', competition: 'laliga' },
        'Bundesliga': { region: 'germany', competition: 'bundesliga' },
        'Serie A': { region: 'italy', competition: 'serie-a' },
        'Ligue 1': { region: 'france', competition: 'ligue-1' }
    };

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

    const getRegionForCompetition = (competition) => {
        // Find which region contains this competition
        for (const [region, competitions] of Object.entries(competitionsData)) {
            if (competitions.includes(competition)) {
                return region.toLowerCase();
            }
        }
        return null;
    };

    const handleCompetitionClick = () => {
        if (isMobile && onLinkClick) {
            onLinkClick();
        }
    };

    return (
        <div className={`w-full h-full ${isMobile ? '' : 'min-h-screen'}`}>
            <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                    {/* Top Leagues Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-foreground mb-4">Top Leagues</h2>
                        <div className="space-y-2">
                            {Object.keys(topLeaguesMapping).map((league) => {
                                const { region, competition } = topLeaguesMapping[league];
                                return (
                                    <Link
                                        key={league}
                                        href={`/${region}/${competition}`}
                                        className="flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors"
                                        onClick={handleCompetitionClick}
                                    >
                                        <div className="w-6 h-6 relative rounded-sm flex items-center justify-center flex-shrink-0">
                                            <Image
                                                src={`/competitions/${region}/${league}.svg`}
                                                alt={`${league} logo`}
                                                width={24}
                                                height={24}
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-foreground">{league}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <Separator />

                    {/* All Leagues Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-foreground">All Leagues</h2>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </Button>
                        </div>
                        
                        <div className="space-y-1">
                            {Object.entries(competitionsData).map(([country, competitions]) => (
                                <div key={country}>
                                    <Button
                                        variant="ghost"
                                        onClick={() => toggleSection(country)}
                                        className="w-full justify-between p-3 h-auto hover:bg-muted/50"
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
                                            <span className="font-medium text-sm text-foreground">
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
                                    </Button>

                                    {expandedSections.has(country) && (
                                        <div className="ml-6 space-y-1">
                                            {competitions.map((competition) => {
                                                const region = getRegionForCompetition(competition);
                                                return (
                                                    <Link
                                                        key={competition}
                                                        className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-md transition-colors text-left"
                                                        href={`/${country.toLowerCase()}/${competition.replace(/\s+/g, '-').toLowerCase()}`}
                                                        onClick={handleCompetitionClick}
                                                    >
                                                        <div className="w-5 h-5 relative rounded-sm flex items-center justify-center flex-shrink-0">
                                                            <Image
                                                                src={region ? `/competitions/${region}/${competition}.svg` : `/competitions/${competition}.svg`}
                                                                alt={`${competition} logo`}
                                                                width={20}
                                                                height={20}
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                        <span className="text-sm text-muted-foreground">
                                                            {competition}
                                                        </span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

export default CompetitionsSidebar;