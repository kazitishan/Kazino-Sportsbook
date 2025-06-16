const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto("https://www.betexplorer.com/football/world/fifa-club-world-cup/fixtures/?stage=KOtwQCtI");

    const getMatches = await page.evaluate(() => {
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

    console.log(getMatches);
    await browser.close();
})();