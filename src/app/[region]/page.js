import { getMatchesByRegion } from '../../utils/matches';
import MatchesContainer from '../../components/MatchesContainer';

export default async function RegionPage({ params }) {
    const { region } = await params;
    const regionName = region.replace(/-/g, ' ');
    
    try {
        const regionData = await getMatchesByRegion(regionName);
        
        return (
            <div className="p-4">
                {regionData.map(competition => (
                    <MatchesContainer
                        key={competition.competition}
                        name={competition.competition}
                        matches={competition.matches}
                    />
                ))}
            </div>
        );
    } catch (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-300 mb-2">Region Not Found</h2>
                    <p className="text-gray-400 mb-4">{regionName} not found</p>
                    <a 
                        href="/" 
                        className="bg-[#267A54] text-white px-6 py-3 rounded-lg hover:bg-[#1E5A3D] transition-colors"
                    >
                        Go Home
                    </a>
                </div>
            </div>
        );
    }
}
