"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Placeholder data structure - replace with actual data fetching
const fetchParticipantData = async (email) => {
    console.log(`Fetching data for: ${email}`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Example: Return mock data if email matches a pattern, else null
    if (email && email.includes('test@')) {
        return {
            name: "Test User",
            email: email,
            reportDate: new Date().toISOString(),
            profileLink: "https://www.cloudskillsboost.google/public_profiles/your-profile-id", // Replace with actual logic
            accessCodeRedeemed: true,
            summary: {
                skillBadges: 3,
                arcadeGames: 2,
                triviaGames: 1,
                labFreeCourses: 0,
            },
            completedItems: {
                skillBadges: ["Google Cloud Computing Foundations: Cloud Computing Fundamentals", "Create and Manage Cloud Resources", "Perform Foundational Infrastructure Tasks in Google Cloud"],
                arcadeGames: ["Level 1: Arcade Basics", "Level 2: Data Dash"],
                triviaGames: ["October Trivia Week 1"],
                labFreeCourses: [],
            }
        };
    } else {
        return null; // Indicate participant not found
    }
};


const ProgressDisplay = ({ participantEmail }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (participantEmail) {
            setIsLoading(true);
            setError(null);
            fetchParticipantData(participantEmail)
                .then(result => {
                    if (result) {
                        setData(result);
                    } else {
                        setError(`No progress data found for ${participantEmail}. Please check the email or contact your facilitator.`);
                        toast.error(`No progress data found for ${participantEmail}.`);
                    }
                })
                .catch(err => {
                    console.error("Error fetching participant data:", err);
                    setError("An error occurred while fetching progress data.");
                    toast.error("Failed to fetch progress data.");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
             setError("No email provided.");
        }
    }, [participantEmail]);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading progress...</div>;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                 <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                 <Link href="/">
                    <Button variant="outline">
                        <ArrowLeft size={16} className="mr-1" /> Back to Lookup
                    </Button>
                </Link>
            </div>
        );
    }

    if (!data) {
         // Should be covered by error state, but as a fallback
        return <div className="flex justify-center items-center min-h-screen">No data available.</div>;
    }

    const formatDate = (isoString) => {
        if (!isoString) return 'N/A';
        try {
            return new Date(isoString).toLocaleDateString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
            });
        } catch (e) {
            return 'Invalid Date';
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header */}
             <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-gray-800 sticky top-0 z-10">
                <div className="container flex h-14 items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold">Arcade Progress Checker</span>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" size="sm">
                            <ArrowLeft size={16} className="mr-1" /> Back to Lookup
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container py-8 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold mb-1">Progress Report</h1>
                    <p className="text-muted-foreground mb-4">
                        For: <span className="font-semibold text-primary">{data.name}</span> ({data.email})
                    </p>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="text-lg">Report Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p><strong>Report Date:</strong> {formatDate(data.reportDate)}</p>
                            <p><strong>Profile Link:</strong>
                                {data.profileLink ? (
                                    <a href={data.profileLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
                                        View Google Cloud Skills Boost Profile <ExternalLink size={14} className="ml-1" />
                                    </a>
                                ) : (
                                    <span className="ml-2 text-muted-foreground">Not Available</span>
                                )}
                            </p>
                            <p><strong>Access Code Redeemed:</strong>
                                <Badge variant={data.accessCodeRedeemed ? "success" : "destructive"} className="ml-2">
                                    {data.accessCodeRedeemed ? "Yes" : "No"}
                                </Badge>
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="text-lg">Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Skill Badges Completed: <strong>{data.summary.skillBadges}</strong></li>
                                <li>Arcade Games Completed: <strong>{data.summary.arcadeGames}</strong></li>
                                <li>Trivia Games Completed: <strong>{data.summary.triviaGames}</strong></li>
                                <li>Lab-free Courses Completed: <strong>{data.summary.labFreeCourses}</strong></li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Accordion type="multiple" className="w-full space-y-4">
                        {Object.entries(data.completedItems).map(([key, items]) => {
                            const titleMap = {
                                skillBadges: "Skill Badges",
                                arcadeGames: "Arcade Games",
                                triviaGames: "Trivia Games",
                                labFreeCourses: "Lab-free Courses"
                            };
                            const title = titleMap[key] || key;
                            const count = items.length;

                            // Only render accordion item if there are completed items
                            if (count === 0) return null;

                            return (
                                <AccordionItem value={key} key={key} className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 px-4">
                                    <AccordionTrigger className="text-base font-semibold hover:no-underline">
                                        Completed {title} ({count})
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {count > 0 ? (
                                            <ul className="list-disc list-inside pl-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                                {items.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-muted-foreground italic">None completed yet.</p>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>

                     {/* Add a message if no items are completed at all */}
                     {Object.values(data.summary).every(v => v === 0) && (
                        <p className="text-center text-muted-foreground mt-6">No items completed yet according to the latest report.</p>
                     )}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-4 border-t dark:border-gray-800 mt-8">
                <div className="container text-center text-xs text-muted-foreground">
                    Progress data as of {formatDate(data.reportDate)}.
                </div>
            </footer>
        </div>
    );
};

export default ProgressDisplay;

// Add custom variants to Badge component if needed (e.g., in badge.jsx)
// Example for success variant:
// success: "border-transparent bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900 dark:text-green-100"