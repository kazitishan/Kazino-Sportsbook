const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

async function getResult(matchLink) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    
    try {
        const fullUrl = `https://www.betexplorer.com${matchLink}`;
        await page.goto(fullUrl);
        
        const result = await page.evaluate(() => {
            const scoreElement = document.querySelector('p.list-details__item__score');
            if (!scoreElement) return null;
            const scoreText = scoreElement.textContent.trim();
            
            if (scoreText === ':') { return 'Match not played yet'; }
            
            const scoreMatch = scoreText.match(/(\d+):(\d+)/);
            if (!scoreMatch) return 'Score format not recognized';
            const homeScore = parseInt(scoreMatch[1]);
            const awayScore = parseInt(scoreMatch[2]);
            
            if (homeScore > awayScore) { return 'Home win'; } 
            else if (homeScore < awayScore) { return 'Away win'; } 
            else { return 'Draw'; }
        });
        
        await browser.close();
        return result;
        
    } catch (error) {
        await browser.close();
        throw new Error(`Error fetching result: ${error.message}`);
    }
}

async function getMatches(fixturesUrl) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    
    try {
        await page.goto(fixturesUrl);

        const matches = await page.evaluate(() => {
            function parseDateTime(dateTimeText) {
                const now = new Date();
                const currentYear = now.getFullYear();
                let matchDate;
                let hour, minute;

                if (dateTimeText.includes('Today')) {
                    matchDate = new Date(now);
                    const timeMatch = dateTimeText.match(/(\d{1,2}):(\d{2})/);
                    if (timeMatch) {
                        hour = parseInt(timeMatch[1]) - 1;
                        minute = parseInt(timeMatch[2]);
                    }
                } else if (dateTimeText.includes('Tomorrow')) {
                    matchDate = new Date(now);
                    matchDate.setDate(matchDate.getDate() + 1);
                    const timeMatch = dateTimeText.match(/(\d{1,2}):(\d{2})/);
                    if (timeMatch) {
                        hour = parseInt(timeMatch[1]) - 1;
                        minute = parseInt(timeMatch[2]);
                    }
                } else {
                    const dateMatch = dateTimeText.match(/(\d{1,2})\.(\d{1,2})\.\s+(\d{1,2}):(\d{2})/);
                    if (dateMatch) {
                        const day = parseInt(dateMatch[1]);
                        const month = parseInt(dateMatch[2]) - 1;
                        hour = parseInt(dateMatch[3]) - 1;
                        minute = parseInt(dateMatch[4]);
                        matchDate = new Date(currentYear, month, day);
                    }
                }

                if (matchDate && hour !== undefined && minute !== undefined) {
                    if (hour < 0) {
                        hour = 23;
                        matchDate.setDate(matchDate.getDate() - 1);
                    }
                    matchDate.setHours(hour, minute, 0, 0);
                    
                    const formattedDate = String(matchDate.getMonth() + 1).padStart(2, '0') + '/' +
                                        String(matchDate.getDate()).padStart(2, '0') + '/' +
                                        matchDate.getFullYear();
                    const formattedTime = matchDate.getHours() + ':' + 
                                        String(matchDate.getMinutes()).padStart(2, '0');
                    
                    return `${formattedDate} ${formattedTime} EST`;
                }
                
                return dateTimeText;
            }

            const tableRows = Array.from(document.querySelectorAll('tr')).filter(row => {
                const oddsCells = row.querySelectorAll('td.table-main__odds');
                return oddsCells.length > 0 && 
                       Array.from(oddsCells).some(cell => cell.querySelector('button'));
            });
        
            return tableRows.map(row => {
                const teams = row.querySelector('td.h-text-left a.in-match');
                const oddsButtons = Array.from(row.querySelectorAll('td.table-main__odds button'));
                const dateTime = row.querySelector('td.table-main__datetime')?.textContent.trim();
                
                return {
                    dateTime: parseDateTime(dateTime || 'Date not available'),
                    homeTeam: teams?.querySelector('span:first-child')?.textContent.trim(),
                    awayTeam: teams?.querySelector('span:last-child')?.textContent.trim(),
                    odds: oddsButtons.map(btn => btn.textContent.trim()),
                    matchLink: teams?.getAttribute('href')
                };
            });
        });

        await browser.close();
        return matches;
        
    } catch (error) {
        await browser.close();
        throw new Error(`Error fetching matches: ${error.message}`);
    }
}

async function getAllMatches() {
    try {
        const competitionsPath = path.join(__dirname, 'competitions.json');
        const competitionsData = await fs.readFile(competitionsPath, 'utf8');
        const competitions = JSON.parse(competitionsData);
        
        const matchesByCompetition = {};
        
        for (const competition of competitions) {
            try {
                const matches = await getMatches(competition.link);
                matchesByCompetition[competition.competition] = matches;
            } catch (error) {
                matchesByCompetition[competition.competition] = [];
            }
        }
        
        return matchesByCompetition;
        
    } catch (error) {
        throw new Error(`Error in getAllMatches: ${error.message}`);
    }
}

(async () => {
    // try {
    //     const clubWorldCupMatches = await getMatches("https://www.betexplorer.com/football/world/fifa-club-world-cup/fixtures/?stage=KOtwQCtI");
    //     console.log("Club World Cup matches:", clubWorldCupMatches);
    // } catch (error) {
    //     console.error("Error:", error);
    // }

    // try {
    //     const result = await getResult("/football/world/fifa-club-world-cup/bayern-munich-auckland-city/jZ257hie/");
    //     console.log("Match result:", result);
    // } catch (error) {
    //     console.error("Error getting result:", error);
    // }

    // usage of getAllMatches:
    // try {
    //     const allMatches = await getAllMatches();
    //     console.log("All matches grouped by competition:", allMatches);
        
    //     // Access specific competition matches:
    //     console.log("Premier League matches:", allMatches["Premier League"]);
    //     console.log("UCL matches:", allMatches["UCL"]);
    // } catch (error) {
    //     console.error("Error getting all matches:", error);
    // }
})();

module.exports = {
    getResult,
    getMatches,
    getAllMatches
};