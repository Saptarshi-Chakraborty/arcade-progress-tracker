"use client";

import { useGlobalContext } from '@/contexts/GlobalProvider';
import appwrite from '@/lib/appwrite';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {
    Award,
    Gamepad2,
    Brain,
    BookOpen,
    Trophy,
    ChevronDown,
    ChevronUp,
    Calendar,
    LineChart as LineChartIcon,
    BarChart as BarChartIcon,
    Loader2,
    AlertCircle,
    User,
    Clock,
    ExternalLink
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
import WelcomeScreen from '@/components/common/WelcomeScreen';

const HomePageBody = () => {
    const router = useRouter();

    const [latestReport, setLatestReport] = useState(null)
    const [allReports, setAllReports] = useState([])
    const [loading, setLoading] = useState(true)
    const [hasFetched, setHasFetched] = useState(false)
    const [expandedSections, setExpandedSections] = useState({
        progressTrends: true,
        details: true,
        history: true
    })
    const [facilitator, setFacilitator] = useState(null)

    const { user, fetchUser } = useGlobalContext();

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, [user, fetchUser, router]);

    useEffect(() => {
        if (user && !hasFetched) {
            fetchData();
        }
    }, [user, hasFetched]);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    async function fetchData() {
        setLoading(true);
        let tryEmail = 'mavic.mini0007@gmail.com'; // Replace with the email you want to test with
        try {
            const data = await appwrite.database.listDocuments(
                appwrite.DATABASE.ID,
                appwrite.DATABASE.COLLECTIONS.INDIVIDUAL_REPORTS,
                [

                    // appwrite.Query.equal('email', user.email),
                    appwrite.Query.equal('email', tryEmail), // Use the test email here
                    appwrite.Query.orderDesc('$createdAt'),
                ]
            );

            console.log(data);
            if (data.total > 0) {
                setLatestReport(data.documents[0]);
                setAllReports(data.documents);
            } else {
                setAllReports([]);
                setLatestReport(null);
            }
            setHasFetched(true);

        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Error fetching data");
        }
        setLoading(false);
    }

    const formatDate = (isoString) => {
        if (!isoString) return 'N/A';
        try {
            return new Date(isoString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
            });
        } catch (e) {
            return 'Invalid Date';
        }
    };

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

    async function fetchFacilitator() {
        let uploadedById = latestReport?.uploadedBy || null;

        if (!uploadedById) {
            setFacilitator(null);
            return;
        }

        try {
            let facilitatorData = await appwrite.database.getDocument(
                appwrite.DATABASE.ID,
                appwrite.DATABASE.COLLECTIONS.FACILITATORS,
                uploadedById
            )

            console.log("Facilitator Data:", facilitatorData);
            setFacilitator(facilitatorData);

        } catch (error) {
            console.error("Error fetching facilitator data:", error);
            setFacilitator(null);
        }
    }

    // Fetch facilitator when latestReport changes
    useEffect(() => {
        if (latestReport && latestReport.uploadedBy) {
            fetchFacilitator();
        } else {
            setFacilitator(null);
        }
    }, [latestReport]);

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

    if (!user) {
        return <WelcomeScreen />;
    }

    if (loading) {
        return (
            <div className="w-full p-4 sm:p-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex flex-col items-center text-center">
                        <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Loading your progress...</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Please wait while we fetch your reports.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!latestReport) {
        return (
            <div className="w-full p-4 sm:p-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex flex-col items-center text-center max-w-md">
                        <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">No Reports Found</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-mono mt-2">{user.email}</p>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            We couldn't find any progress reports for your email.<br />
                            If you believe this is an error, please contact your facilitator.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const trendData = prepareProgressTrendData();
    const categoryData = prepareCategoryDistribution();
    const totalCompleted = categoryData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="w-full p-4 sm:p-6">
            {/* Header & Welcome */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold dark:text-white">Your Progress Dashboard</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Welcome back, {user.name || latestReport.name || 'Participant'} ! <br />Here's your Google Cloud Arcade progress under the Facilitator Program.
                </p>
            </div>

            {/* User Profile Summary */}
            <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
                            <User className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-800 dark:text-gray-200">{latestReport.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{latestReport.email}</p>
                            {latestReport.skillBoostUrl && (
                                <a
                                    href={latestReport.skillBoostUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-1"
                                >
                                    <ExternalLink className="h-3 w-3" />
                                    Your Skill Boost Profile
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700 dark:text-gray-300">
                                Latest Report: {formatDate(latestReport.reportDate)}
                            </span>
                        </div>
                        {latestReport.milestoneEarned && latestReport.milestoneEarned !== 'None' && (
                            <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                                <Trophy className="h-4 w-4 text-amber-500" />
                                <span className="text-xs font-medium text-amber-800 dark:text-amber-300">
                                    {latestReport.milestoneEarned}
                                </span>
                            </div>
                        )}
                        <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                            <span className="text-xs font-medium text-green-800 dark:text-green-300">
                                Access Code: {latestReport.accessCodeStatus || 'Unknown'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-purple-200 dark:border-purple-800">
                    <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-medium text-purple-700 dark:text-purple-300">Skill Badges</div>
                        <Award className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                    </div>
                    <div className="text-xl font-bold text-purple-800 dark:text-white">{latestReport.noOfSkillBadgesCompleted || 0}</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/40 dark:to-orange-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-orange-200 dark:border-orange-800">
                    <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-medium text-orange-700 dark:text-orange-300">Arcade Games</div>
                        <Gamepad2 className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                    </div>
                    <div className="text-xl font-bold text-orange-800 dark:text-white">{latestReport.noOfArcadeGamesCompleted || 0}</div>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/40 dark:to-pink-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-pink-200 dark:border-pink-800">
                    <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-medium text-pink-700 dark:text-pink-300">Trivia Games</div>
                        <Brain className="h-5 w-5 text-pink-500 dark:text-pink-400" />
                    </div>
                    <div className="text-xl font-bold text-pink-800 dark:text-white">{latestReport.noOfTriviaGamesCompleted || 0}</div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/40 dark:to-cyan-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-cyan-200 dark:border-cyan-800">
                    <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Lab-Free Courses</div>
                        <BookOpen className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
                    </div>
                    <div className="text-xl font-bold text-cyan-800 dark:text-white">{latestReport.noOfLabFreeCoursesCompleted || 0}</div>
                </div>
            </div>

            {/* Progress Trends Section */}
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

            {/* Details Section */}
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

                            {/* Arcade Games - Fixed incorrect opening/closing ul tags */}
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

                            {/* Trivia Games - Fixed incorrect opening/closing ul tags */}
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

                            {/* Lab-Free Courses - Fixed div structure */}
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

            {/* Report History - Fixed div structure and table */}
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

            {/* Add custom scrollbar styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 0, 0, 0.3);
                }
            `}</style>
            {/* Facilitator Name at the end */}
            <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                {facilitator && facilitator.name ? (
                    <>Uploaded By Facilitator: <span className="font-semibold text-blue-700 dark:text-blue-300">{facilitator.name}</span></>
                ) : (
                    <>DataUploaded By Facilitator: <span className="italic">Unknown</span></>
                )}
            </div>
        </div>
    );
}

export default HomePageBody;