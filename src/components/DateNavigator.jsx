"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

function DateNavigator() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [displayText, setDisplayText] = useState('Today');
    const [showLive, setShowLive] = useState(searchParams.get('live') === 'true');

    useEffect(() => {
        const dateParam = searchParams.get('date');
        if (dateParam) {
            const date = new Date(dateParam);
            setCurrentDate(date);
            updateDisplayText(date);
        } else {
            setCurrentDate(new Date());
            setDisplayText('Today');
        }
        
        // Update live state based on URL parameter
        setShowLive(searchParams.get('live') === 'true');
    }, [searchParams]);

    const updateDisplayText = (date) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Reset time for comparison
        const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());

        if (dateOnly.getTime() === todayOnly.getTime()) {
            setDisplayText('Today');
        } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
            setDisplayText('Tomorrow');
        } else {
            const options = { weekday: 'short', month: 'short', day: 'numeric' };
            setDisplayText(date.toLocaleDateString('en-US', options));
        }
    };

    const navigateToDate = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        const dateString = `${month}-${day}-${year}`;
        
        router.push(`/?date=${dateString}`);
    };

    const goBack = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 1);
        
        // Check if the new date would be before today
        const today = new Date();
        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const newDateOnly = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
        
        if (newDateOnly >= todayOnly) {
            navigateToDate(newDate);
        }
    };

    const goForward = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 1);
        navigateToDate(newDate);
    };

    const isToday = () => {
        const today = new Date();
        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        return currentDateOnly.getTime() === todayOnly.getTime();
    };

    const handleLiveToggle = () => {
        if (!isToday()) return;
        
        const newShowLive = !showLive;
        const currentParams = new URLSearchParams(searchParams.toString());
        
        if (newShowLive) {
            currentParams.set('live', 'true');
        } else {
            currentParams.delete('live');
        }
        
        const newUrl = `/?${currentParams.toString()}`;
        router.push(newUrl);
    };

    return (
        <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center bg-card rounded-lg border border-border px-4 py-2">
                {/* Back Arrow */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={goBack}
                    disabled={isToday()}
                    className="p-2 h-8 w-8"
                    aria-label="Previous day"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Button>

                {/* Current Date Display */}
                <div className="mx-4 px-4 py-1">
                    <span className="text-lg font-semibold text-foreground">{displayText}</span>
                </div>

                {/* Forward Arrow */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={goForward}
                    className="p-2 h-8 w-8"
                    aria-label="Next day"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Button>
            </div>

            {/* Live Matches Toggle */}
            {isToday() && (
                <Button
                    variant={showLive ? "default" : "outline"}
                    size="sm"
                    onClick={handleLiveToggle}
                    className="px-4 py-2 h-10"
                    aria-label="Toggle live matches"
                >
                    <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${showLive ? 'bg-white animate-pulse' : 'bg-red-500'}`}></div>
                        <span className="text-sm font-medium">LIVE</span>
                    </div>
                </Button>
            )}
        </div>
    );
}

export default DateNavigator;
