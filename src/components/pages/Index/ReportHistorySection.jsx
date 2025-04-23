import React from 'react';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';

const ReportHistorySection = ({ allReports, expandedSections, toggleSection, formatDate }) => {
    // Helper function to render deltas
    const renderDelta = (currentValue, index, reports, fieldName) => {
        // Don't show delta for the last row (oldest report)
        if (index === reports.length - 1 || reports.length <= 1) return null;

        const nextValue = reports[index + 1][fieldName] || 0;
        const currentVal = currentValue || 0;
        const delta = currentVal - nextValue;

        if (delta === 0) {
            return <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">(+0)</span>;
        } else if (delta > 0) {
            return <span className="ml-1 text-xs text-green-600 dark:text-green-400">(+{delta})</span>;
        } else {
            return <span className="ml-1 text-xs text-red-600 dark:text-red-400">({delta})</span>;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div
                className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('history')}
            >
                <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-indigo-500" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Report History</h3>
                </div>
                {expandedSections.history ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
            </div>

            {expandedSections.history && (
                <div className="p-4">
                    {allReports.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Skill Badges</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Arcade Games</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trivia Games</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lab-Free Courses</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {allReports.map((report, index) => (
                                        <tr key={report.$id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/30'}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{formatDate(report.reportDate)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {report.noOfSkillBadgesCompleted || 0}
                                                {renderDelta(report.noOfSkillBadgesCompleted, index, allReports, 'noOfSkillBadgesCompleted')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {report.noOfArcadeGamesCompleted || 0}
                                                {renderDelta(report.noOfArcadeGamesCompleted, index, allReports, 'noOfArcadeGamesCompleted')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {report.noOfTriviaGamesCompleted || 0}
                                                {renderDelta(report.noOfTriviaGamesCompleted, index, allReports, 'noOfTriviaGamesCompleted')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {report.noOfLabFreeCoursesCompleted || 0}
                                                {renderDelta(report.noOfLabFreeCoursesCompleted, index, allReports, 'noOfLabFreeCoursesCompleted')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center py-4 text-gray-500 dark:text-gray-400">No historical report data available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReportHistorySection;
