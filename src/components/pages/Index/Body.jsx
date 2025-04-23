"use client";

import { useGlobalContext } from '@/contexts/GlobalProvider';
import appwrite from '@/lib/appwrite';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
    Award,
    Gamepad2,
    Brain,
    BookOpen,
    Trophy,
    Loader2,
    AlertCircle,
    User,
    ExternalLink,
    Calendar
} from 'lucide-react';
import WelcomeScreen from '@/components/common/WelcomeScreen';
import ProgressTrendsSection from '@/components/pages/Index/ProgressTrendsSection';
import CompletionDetailsSection from '@/components/pages/Index/CompletionDetailsSection';
import ReportHistorySection from '@/components/pages/Index/ReportHistorySection';

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
                    appwrite.Query.equal('email', user.email),
                    // appwrite.Query.equal('email', tryEmail),
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
                            <h3 className="font-medium text-gray-800 dark:text-gray-200">{latestReport?.name || "no name found"}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{latestReport?.email || "no email found"}</p>
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

            {/* Plug in the separated components */}
            <ProgressTrendsSection 
                latestReport={latestReport} 
                allReports={allReports} 
                expandedSections={expandedSections} 
                toggleSection={toggleSection}
                formatDate={formatDate}
            />

            <CompletionDetailsSection 
                latestReport={latestReport} 
                expandedSections={expandedSections} 
                toggleSection={toggleSection}
            />

            <ReportHistorySection 
                allReports={allReports}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                formatDate={formatDate}
            />

            {/* Custom scrollbar styles */}
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
                    <>Data Uploaded By Facilitator: <span className="italic">Unknown</span></>
                )}
            </div>
        </div>
    );
};

export default HomePageBody;