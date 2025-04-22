import React, { useState } from 'react';
import { 
    LineChart as LineChartIcon, 
    BarChart as BarChartIcon, 
    PieChart as PieChartIcon,
    ChevronDown, 
    ChevronUp 
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const ChartVisualizations = ({ reports, stats }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    
    const toggleExpanded = () => setIsExpanded(prev => !prev);

    const formatDate = (isoString) => {
        if (!isoString) return 'N/A';
        try {
            let date = new Date(isoString);

            return new Date(isoString).toLocaleDateString(
                'en-US',
                {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                }
            );
        } catch (e) {
            return 'Invalid Date';
        }
    };

    const prepareProgressTrendData = () => {
        if (!reports || reports.length === 0) return [];

        return reports
            .slice(0, 10)
            .sort((a, b) => new Date(a.reportDate) - new Date(b.reportDate))
            .map(report => ({
                date: formatDate(report.reportDate),
                skillBadges: report.skillBadgesCompleted || 0,
                arcadeGames: report.arcadeGamesCompleted || 0,
                triviaGames: report.triviaGamesCompleted || 0,
                labFreeCourses: report.labFreeCoursesCompleted || 0
            }));
    };

    const prepareCategoryDistribution = () => {
        return [
            { name: 'Skill Badges', value: stats.skillBadgesCompleted || 0, color: '#8b5cf6' },
            { name: 'Arcade Games', value: stats.arcadeGamesCompleted || 0, color: '#f97316' },
            { name: 'Trivia Games', value: stats.triviaGamesCompleted || 0, color: '#ec4899' },
            { name: 'Lab-Free Courses', value: stats.labFreeCoursesCompleted || 0, color: '#06b6d4' },
        ];
    };

    const prepareComparisonData = () => {
        if (!reports || reports.length < 2) return [];
        
        const latestReport = reports[0] || {};
        const previousReport = reports[1] || {};
        
        return [
            {
                name: 'Skill Badges',
                current: latestReport.skillBadgesCompleted || 0,
                previous: previousReport.skillBadgesCompleted || 0,
            },
            {
                name: 'Arcade Games',
                current: latestReport.arcadeGamesCompleted || 0,
                previous: previousReport.arcadeGamesCompleted || 0,
            },
            {
                name: 'Trivia Games',
                current: latestReport.triviaGamesCompleted || 0,
                previous: previousReport.triviaGamesCompleted || 0,
            },
            {
                name: 'Lab-Free Courses',
                current: latestReport.labFreeCoursesCompleted || 0,
                previous: previousReport.labFreeCoursesCompleted || 0,
            },
        ];
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
            <div 
                className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-pointer"
                onClick={toggleExpanded}
            >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <BarChartIcon className="h-5 w-5 text-blue-500" />
                    Progress Visualization
                </h3>
                {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
            </div>

            {isExpanded && (
                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                <LineChartIcon className="h-4 w-4" />
                                Progress Over Time
                            </h4>
                            <div className="h-48 sm:h-56 md:h-64">
                                {reports.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={prepareProgressTrendData()}>
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
                                ) : (
                                    <div className="h-full flex items-center justify-center">
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">No report data available to display chart</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                <PieChartIcon className="h-4 w-4" />
                                Category Distribution
                            </h4>
                            <div className="flex flex-col items-center h-48 sm:h-56 md:h-64">
                                <ResponsiveContainer width="100%" height="80%">
                                    <PieChart>
                                        <Pie
                                            data={prepareCategoryDistribution()}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {prepareCategoryDistribution().map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        Total Completed: {stats.skillBadgesCompleted + stats.arcadeGamesCompleted + stats.triviaGamesCompleted + stats.labFreeCoursesCompleted}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {reports.length >= 2 && (
                            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg lg:col-span-2">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <BarChartIcon className="h-4 w-4" />
                                    Latest Report vs Previous Report
                                </h4>
                                <div className="h-48 sm:h-56 md:h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={prepareComparisonData()}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                                            <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
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
                                            <Bar dataKey="current" name="Latest Report" fill="#3b82f6" />
                                            <Bar dataKey="previous" name="Previous Report" fill="#9ca3af" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChartVisualizations;
