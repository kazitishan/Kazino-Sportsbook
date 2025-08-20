"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function DateNavigator() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [displayText, setDisplayText] = useState('Today');

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

    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 px-4 py-2">
                {/* Back Arrow */}
                <button
                    onClick={goBack}
                    disabled={isToday()}
                    className={`p-2 rounded-full transition-colors ${
                        isToday()
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    aria-label="Previous day"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Current Date Display */}
                <div className="mx-4 px-4 py-1">
                    <span className="text-lg font-semibold text-gray-800">{displayText}</span>
                </div>

                {/* Forward Arrow */}
                <button
                    onClick={goForward}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                    aria-label="Next day"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default DateNavigator;
