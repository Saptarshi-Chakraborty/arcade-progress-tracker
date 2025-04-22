import React, { useMemo } from 'react'
import { Award, Gamepad2, Brain, Trophy, ArrowRight, Check } from 'lucide-react';

const FACILITATOR_MILESTONES = [
    {
        id: 1,
        title: 'Milestone #1',
        arcadeGames: 400,
        triviaGames: 400,
        skillBadges: 1000,
    },
    {
        id: 2,
        title: 'Milestone #2',
        arcadeGames: 600,
        triviaGames: 600,
        skillBadges: 2000,
    },
    {
        id: 3,
        title: 'Milestone #3',
        arcadeGames: 800,
        triviaGames: 700,
        skillBadges: 3000,
    },
    {
        id: 4,
        title: 'Ultimate Milestone',
        arcadeGames: 1000,
        triviaGames: 800,
        skillBadges: 4400,
    },
]


const FacilitatorMilestones = ({ arcadeGamesCompleted, triviaGamesCompleted, skillBadgesCompleted }) => {
    const { currentMilestone, nextMilestone, milestoneProgress } = useMemo(() => {
        // Default initialization
        let current = null;
        let next = FACILITATOR_MILESTONES[0];
        
        // Find the highest milestone achieved
        for (let i = FACILITATOR_MILESTONES.length - 1; i >= 0; i--) {
            const milestone = FACILITATOR_MILESTONES[i];
            if (
                arcadeGamesCompleted >= milestone.arcadeGames &&
                triviaGamesCompleted >= milestone.triviaGames &&
                skillBadgesCompleted >= milestone.skillBadges
            ) {
                current = milestone;
                next = FACILITATOR_MILESTONES[i + 1] || null;
                break;
            }
        }
        
        // If no milestone achieved, set current to null and next to first milestone
        if (!current) {
            current = null;
            next = FACILITATOR_MILESTONES[0];
        }
        
        // Calculate progress percentages for the next milestone
        const progress = {
            arcade: next ? Math.min(100, (arcadeGamesCompleted / next.arcadeGames) * 100) : 100,
            trivia: next ? Math.min(100, (triviaGamesCompleted / next.triviaGames) * 100) : 100,
            skillBadges: next ? Math.min(100, (skillBadgesCompleted / next.skillBadges) * 100) : 100
        };
        
        return { currentMilestone: current, nextMilestone: next, milestoneProgress: progress };
    }, [arcadeGamesCompleted, triviaGamesCompleted, skillBadgesCompleted]);

    const calculateOverallProgress = () => {
        if (!nextMilestone) return 100; // All milestones completed
        
        const arcadeProgress = Math.min(arcadeGamesCompleted / nextMilestone.arcadeGames, 1);
        const triviaProgress = Math.min(triviaGamesCompleted / nextMilestone.triviaGames, 1);
        const skillProgress = Math.min(skillBadgesCompleted / nextMilestone.skillBadges, 1);
        
        // Average progress across all three categories
        return ((arcadeProgress + triviaProgress + skillProgress) / 3) * 100;
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-amber-500" />
                        Milestone Progress
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {currentMilestone 
                            ? `You've achieved ${currentMilestone.title}${nextMilestone ? ' - keep going!' : ' - all milestones completed!'}`
                            : "You're working toward your first milestone!"}
                    </p>
                </div>

                {currentMilestone && (
                    <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/20 px-4 py-2 rounded-full">
                        <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        <span className="font-medium text-amber-800 dark:text-amber-200">{currentMilestone.title}</span>
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                )}
            </div>

            {/* Overall Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {nextMilestone ? `Progress toward ${nextMilestone.title}` : 'All milestones completed!'}
                    </span>
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                        {Math.round(calculateOverallProgress())}%
                    </span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
                        style={{ width: `${calculateOverallProgress()}%` }}
                    ></div>
                </div>
            </div>

            {/* Category Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Skill Badges Progress */}
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            <span className="font-medium text-gray-800 dark:text-gray-200">Skill Badges</span>
                        </div>
                        <span className="text-sm font-mono bg-purple-100 dark:bg-purple-800/50 px-2 py-0.5 rounded">
                            {skillBadgesCompleted}/{nextMilestone?.skillBadges || 'Max'}
                        </span>
                    </div>
                    <div className="w-full h-2.5 bg-purple-200 dark:bg-purple-800/30 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-purple-600 dark:bg-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `${milestoneProgress.skillBadges}%` }}
                        ></div>
                    </div>
                </div>

                {/* Arcade Games Progress */}
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-100 dark:border-orange-800">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <Gamepad2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            <span className="font-medium text-gray-800 dark:text-gray-200">Arcade Games</span>
                        </div>
                        <span className="text-sm font-mono bg-orange-100 dark:bg-orange-800/50 px-2 py-0.5 rounded">
                            {arcadeGamesCompleted}/{nextMilestone?.arcadeGames || 'Max'}
                        </span>
                    </div>
                    <div className="w-full h-2.5 bg-orange-200 dark:bg-orange-800/30 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-orange-600 dark:bg-orange-500 rounded-full transition-all duration-500"
                            style={{ width: `${milestoneProgress.arcade}%` }}
                        ></div>
                    </div>
                </div>

                {/* Trivia Games Progress */}
                <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border border-pink-100 dark:border-pink-800">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <Brain className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                            <span className="font-medium text-gray-800 dark:text-gray-200">Trivia Games</span>
                        </div>
                        <span className="text-sm font-mono bg-pink-100 dark:bg-pink-800/50 px-2 py-0.5 rounded">
                            {triviaGamesCompleted}/{nextMilestone?.triviaGames || 'Max'}
                        </span>
                    </div>
                    <div className="w-full h-2.5 bg-pink-200 dark:bg-pink-800/30 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-pink-600 dark:bg-pink-500 rounded-full transition-all duration-500"
                            style={{ width: `${milestoneProgress.trivia}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Milestone path visualization - Fix for mobile view */}
            {nextMilestone && (
                <div className="mt-8 relative">
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-2 px-4 md:justify-center scrollbar-thin">
                        {FACILITATOR_MILESTONES.map((milestone, index) => (
                            <React.Fragment key={milestone.id}>
                                <div 
                                    className={`flex flex-col items-center shrink-0 ${
                                        currentMilestone && milestone.id <= currentMilestone.id
                                            ? 'text-amber-600 dark:text-amber-400'
                                            : nextMilestone && milestone.id === nextMilestone.id
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : 'text-gray-400 dark:text-gray-600'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        currentMilestone && milestone.id <= currentMilestone.id
                                            ? 'bg-amber-100 dark:bg-amber-900/30 ring-2 ring-amber-500'
                                            : nextMilestone && milestone.id === nextMilestone.id
                                            ? 'bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500 animate-pulse'
                                            : 'bg-gray-100 dark:bg-gray-800'
                                    }`}>
                                        {currentMilestone && milestone.id <= currentMilestone.id ? (
                                            <Check className="h-5 w-5" />
                                        ) : (
                                            <Trophy className="h-5 w-5" />
                                        )}
                                    </div>
                                    <span className="text-xs font-medium mt-1 whitespace-nowrap">{milestone.title}</span>
                                </div>
                                {index < FACILITATOR_MILESTONES.length - 1 && (
                                    <ArrowRight className={`h-5 w-5 mx-1 shrink-0 ${
                                        currentMilestone && milestone.id < currentMilestone.id
                                            ? 'text-amber-500'
                                            : 'text-gray-300 dark:text-gray-600'
                                    }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <style jsx global>{`
                        .scrollbar-thin::-webkit-scrollbar {
                            height: 4px;
                        }
                        .scrollbar-thin::-webkit-scrollbar-track {
                            background: rgba(0, 0, 0, 0.05);
                            border-radius: 10px;
                        }
                        .scrollbar-thin::-webkit-scrollbar-thumb {
                            background: rgba(0, 0, 0, 0.15);
                            border-radius: 10px;
                        }
                        .scrollbar-thin {
                            scrollbar-width: thin;
                            scrollbar-color: rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.05);
                        }
                        @media (prefers-color-scheme: dark) {
                            .scrollbar-thin::-webkit-scrollbar-track {
                                background: rgba(255, 255, 255, 0.05);
                            }
                            .scrollbar-thin::-webkit-scrollbar-thumb {
                                background: rgba(255, 255, 255, 0.15);
                            }
                            .scrollbar-thin {
                                scrollbar-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.05);
                            }
                        }
                    `}</style>
                </div>
            )}

            {/* Information about milestone program */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-6 text-center italic">
                These Milestones are based on the Facilitator Program of April 2025
            </p>
        </div>
    )
}

export default FacilitatorMilestones