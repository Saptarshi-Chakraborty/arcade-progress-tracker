import React from 'react';
import { BarChartIcon, ChevronDown, ChevronUp, Award, Gamepad2, Brain, BookOpen } from 'lucide-react';

const CompletionDetailsSection = ({ latestReport, expandedSections, toggleSection }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
            <div
                className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('details')}
            >
                <div className="flex items-center gap-2">
                    <BarChartIcon className="h-5 w-5 text-green-500" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Completion Details</h3>
                </div>
                {expandedSections.details ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
            </div>

            {expandedSections.details && (
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Skill Badges */}
                        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <Award className="h-5 w-5 text-purple-500" />
                                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
                                    Skill Badges ({latestReport.noOfSkillBadgesCompleted || 0})
                                </h4>
                            </div>
                            <div className="max-h-40 overflow-y-auto custom-scrollbar">
                                {latestReport.skillBadgesCompleted && latestReport.skillBadgesCompleted.length > 0 ? (
                                    <ul className="space-y-1">
                                        {latestReport.skillBadgesCompleted.map((badge, index) => (
                                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300 py-1 px-2 rounded bg-white dark:bg-gray-800">
                                                {badge}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">No skill badges completed yet.</p>
                                )}
                            </div>
                        </div>

                        {/* Arcade Games */}
                        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <Gamepad2 className="h-5 w-5 text-orange-500" />
                                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
                                    Arcade Games ({latestReport.noOfArcadeGamesCompleted || 0})
                                </h4>
                            </div>
                            <div className="max-h-40 overflow-y-auto custom-scrollbar">
                                {latestReport.arcadeGamesCompleted && latestReport.arcadeGamesCompleted.length > 0 ? (
                                    <ul className="space-y-1">
                                        {latestReport.arcadeGamesCompleted.map((game, index) => (
                                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300 py-1 px-2 rounded bg-white dark:bg-gray-800">
                                                {game}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">No arcade games completed yet.</p>
                                )}
                            </div>
                        </div>

                        {/* Trivia Games */}
                        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <Brain className="h-5 w-5 text-pink-500" />
                                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
                                    Trivia Games ({latestReport.noOfTriviaGamesCompleted || 0})
                                </h4>
                            </div>
                            <div className="max-h-40 overflow-y-auto custom-scrollbar">
                                {latestReport.triviaGamesCompleted && latestReport.triviaGamesCompleted.length > 0 ? (
                                    <ul className="space-y-1">
                                        {latestReport.triviaGamesCompleted.map((game, index) => (
                                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300 py-1 px-2 rounded bg-white dark:bg-gray-800">
                                                {game}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">No trivia games completed yet.</p>
                                )}
                            </div>
                        </div>

                        {/* Lab-Free Courses */}
                        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <BookOpen className="h-5 w-5 text-cyan-500" />
                                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
                                    Lab-Free Courses ({latestReport.noOfLabFreeCoursesCompleted || 0})
                                </h4>
                            </div>
                            <div className="max-h-40 overflow-y-auto custom-scrollbar">
                                {latestReport.labFreeCoursesCompleted && latestReport.labFreeCoursesCompleted.length > 0 ? (
                                    <ul className="space-y-1">
                                        {latestReport.labFreeCoursesCompleted.map((course, index) => (
                                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300 py-1 px-2 rounded bg-white dark:bg-gray-800">
                                                {course}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">No lab-free courses completed yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompletionDetailsSection;
