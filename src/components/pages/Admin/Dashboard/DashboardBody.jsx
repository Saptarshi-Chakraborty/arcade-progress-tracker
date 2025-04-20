"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from 'next/link';
import { Upload, Users, BarChart2, CheckCircle, Gamepad2, BookOpen, ListChecks } from 'lucide-react'; // Import icons

// Placeholder data fetching function
const fetchDashboardData = async () => {
    console.log("Fetching dashboard data...");
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        latestReportDate: new Date().toISOString(),
        stats: {
            totalParticipants: 150,
            redeemedAccess: 120, // Number who redeemed
            skillBadgesCompleted: 450,
            arcadeGamesCompleted: 280,
            triviaGamesCompleted: 110,
            labFreeCoursesCompleted: 55,
        },
        recentUploads: [
            { id: 1, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), filename: "progress_report_oct.csv", participants: 150, comments: "" },
            { id: 2, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), filename: "progress_report_sep.csv", participants: 145, comments: "Initial upload" },
            { id: 3, date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), filename: "progress_report_aug.csv", participants: 130, comments: "" },
        ]
    };
};

const DashboardBody = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchDashboardData()
            .then(setData)
            .catch(err => console.error("Failed to fetch dashboard data:", err))
            .finally(() => setIsLoading(false));
    }, []);

    const formatDate = (isoString) => {
        if (!isoString) return 'N/A';
        try {
            return new Date(isoString).toLocaleDateString();
        } catch (e) {
            return 'Invalid Date';
        }
    };

    const calculatePercentage = (value, total) => {
        if (!total || total === 0) return 0;
        return ((value / total) * 100).toFixed(1);
    };

    if (isLoading) {
        return <div>Loading dashboard...</div>; // Replace with Skeleton Loader if desired
    }

    if (!data) {
        return <div>Failed to load dashboard data.</div>;
    }

    const redeemedPercentage = calculatePercentage(data.stats.redeemedAccess, data.stats.totalParticipants);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                    Overview based on the latest report uploaded on: {formatDate(data.latestReportDate)}
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.stats.totalParticipants}</div>
                        <p className="text-xs text-muted-foreground">In the latest report</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Redeemed Access</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.stats.redeemedAccess}</div>
                        <p className="text-xs text-muted-foreground">{redeemedPercentage}% of total participants</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Skill Badges Completed</CardTitle>
                        <ListChecks className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.stats.skillBadgesCompleted}</div>
                        <p className="text-xs text-muted-foreground">Total across all participants</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Arcade Games Completed</CardTitle>
                        <Gamepad2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.stats.arcadeGamesCompleted}</div>
                        <p className="text-xs text-muted-foreground">Total across all participants</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Trivia Games Completed</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.stats.triviaGamesCompleted}</div>
                        <p className="text-xs text-muted-foreground">Total across all participants</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Lab Free Courses Completed</CardTitle>
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.stats.labFreeCoursesCompleted}</div>
                        <p className="text-xs text-muted-foreground">Total across all participants</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Uploads Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Uploads</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Filename</TableHead>
                                <TableHead className="text-right">Participants</TableHead>
                                <TableHead>Comments</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.recentUploads.map((upload) => (
                                <TableRow key={upload.id}>
                                    <TableCell>{formatDate(upload.date)}</TableCell>
                                    <TableCell className="font-medium">{upload.filename}</TableCell>
                                    <TableCell className="text-right">{upload.participants}</TableCell>
                                    <TableCell>{upload.comments || '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex space-x-4">
                <Button asChild>
                    <Link href="/admin/upload">
                        <Upload className="mr-2 h-4 w-4" /> Upload New Report
                    </Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/admin/participants">
                        <Users className="mr-2 h-4 w-4" /> View All Participants
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default DashboardBody;