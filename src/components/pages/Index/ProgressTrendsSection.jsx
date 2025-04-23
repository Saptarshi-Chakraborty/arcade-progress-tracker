import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { ChevronDown, ChevronUp, LineChart as LineChartIcon } from 'lucide-react';

const ProgressTrendsSection = ({ 
    latestReport, 
    allReports, 
    expandedSections, 
    toggleSection,
    formatDate 
}) => {
    // Prepare data for trend chart
    const prepareProgressTrendData = () => {
        if (!allReports || allReports.length === 0) return [];

        return allReports
            .slice() // Create copy to avoid mutating original
            .sort((a, b) => new Date(a.reportDate) - new Date(b.reportDate))
            .map(report => ({
                date: formatDate(report.reportDate),
                skillBadges: report.noOfSkillBadgesCompleted || 0,
                arcadeGames: report.noOfArcadeGamesCompleted || 0,
                triviaGames: report.noOfTriviaGamesCompleted || 0,
                labFreeCourses: report.noOfLabFreeCoursesCompleted || 0
            }));
    };

    // Prepare data for category distribution chart
    const prepareCategoryDistribution = () => {
        if (!latestReport) return [];

        return [
            { name: 'Skill Badges', value: latestReport.noOfSkillBadgesCompleted || 0, color: '#8b5cf6' },
            { name: 'Arcade Games', value: latestReport.noOfArcadeGamesCompleted || 0, color: '#f97316' },
            { name: 'Trivia Games', value: latestReport.noOfTriviaGamesCompleted || 0, color: '#ec4899' },
            { name: 'Lab-Free Courses', value: latestReport.noOfLabFreeCoursesCompleted || 0, color: '#06b6d4' },
        ];
    };

    const trendData = prepareProgressTrendData();
    const categoryData = prepareCategoryDistribution();
    const totalCompleted = categoryData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
            <div
                className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('progressTrends')}
            >
                <div className="flex items-center gap-2">
                    <LineChartIcon className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Progress Trends</h3>
                </div>
                {expandedSections.progressTrends ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
            </div>

            {expandedSections.progressTrends && (
                <div className="p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Line Chart */}
                        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Progress Over Time</h4>
                            <div className="h-48 sm:h-56 md:h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={trendData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                                        <XAxis dataKey="date" stroke="#6B7280" fontSize={12} tickMargin={10} />
                                        <YAxis stroke="#6B7280" fontSize={12} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#1F2937',
                                                border: 'none',
                                                borderRadius: '4px',
                                                color: '#F9FAFB'
                                            }}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="skillBadges"
                                            name="Skill Badges"
                                            stroke="#8b5cf6"
                                            strokeWidth={2}
                                            activeDot={{ r: 6 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="arcadeGames"
                                            name="Arcade Games"
                                            stroke="#f97316"
                                            strokeWidth={2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="triviaGames"
                                            name="Trivia Games"
                                            stroke="#ec4899"
                                            strokeWidth={2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="labFreeCourses"
                                            name="Lab-Free Courses"
                                            stroke="#06b6d4"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Distribution Chart */}
                        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Category Distribution</h4>
                            <div className="flex flex-col items-center h-48 sm:h-56 md:h-64">
                                <ResponsiveContainer width="100%" height="80%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        Total Completed: {totalCompleted}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProgressTrendsSection;
