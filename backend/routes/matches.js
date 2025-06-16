const express = require('express');
const router = express.Router();
const { getMatches } = require('../scraper');
const competitions = require('../competitions.json');

// Route to get matches for all competitions
router.get('/', async (req, res) => {
    try {
        const allMatches = {};

        const matchPromises = competitions.map(async (comp) => {
            try {
                const matches = await getMatches(comp.link);
                return {
                    competition: comp.competition,
                    matches: matches
                };
            } catch (error) {
                console.error(`Error fetching matches for ${comp.competition}:`, error);
                return {
                    competition: comp.competition,
                    error: 'Failed to fetch matches'
                };
            }
        });

        const results = await Promise.all(matchPromises);
        
        results.forEach(result => {
            allMatches[result.competition] = result.matches || result.error;
        });

        res.json(allMatches);
    } catch (error) {
        console.error('Error in matches route:', error);
        res.status(500).json({ error: 'Failed to process matches request' });
    }
});

// Route to get matches for a specific competition
router.get('/:competition', async (req, res) => {
    try {
        const competitionName = req.params.competition;
        const competition = competitions.find(c => 
            c.competition.toLowerCase() === competitionName.toLowerCase()
        );

        if (!competition) {
            return res.status(404).json({ error: 'Competition not found' });
        }

        const matches = await getMatches(competition.link);
        res.json({
            competition: competition.competition,
            matches: matches
        });
    } catch (error) {
        console.error(`Error fetching matches for ${req.params.competition}:`, error);
        res.status(500).json({ error: 'Failed to fetch matches' });
    }
});

// router.get('/', async (req, res) => {
//     try {
//         const fixturesUrl = "https://www.betexplorer.com/football/world/fifa-club-world-cup/fixtures/?stage=KOtwQCtI";
//         const matches = await getMatches(fixturesUrl);
//         res.json(matches);
//     } catch (error) {
//         console.error('Error fetching matches:', error);
//         res.status(500).json({ error: 'Failed to fetch matches' });
//     }
// });

module.exports = router;