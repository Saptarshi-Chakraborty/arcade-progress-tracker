import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import apppwrite from '@/lib/appwrite';
import {
    AlertCircle,
    CalendarDays,
    CheckCircle2,
    Clock,
    Info,
    KeyRound,
    Loader2, Mail,
    Phone,
    ShieldAlert,
    ShieldCheck,
    User
} from "lucide-react"; // Import more icons
import { useEffect, useState } from 'react';

const MyAccountBody = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper function to format dates
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleString();
        } catch (e) {
            return 'Invalid Date';
        }
    };

    async function fetchUser() {
        setLoading(true);
        setError(null); // Reset error on refresh
        try {
            const userData = await apppwrite.account.get(); // Fetch user data from Appwrite
            setUser(userData);
            console.log(userData); // Log user data for debugging
        } catch (err) {
            setError(err.message);
            toast.error(`Failed to fetch user data: ${err.message}`); // Show error toast
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();

        return () => {
            // Cleanup if needed
            setUser(null);
            setLoading(false);
            setError(null);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950">


            {/* Main Content */}
            <main className="flex-1 container py-8">
                {loading && !user ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-64">
                        <Card className="w-full max-w-md bg-destructive/10 border-destructive">
                            <CardHeader>
                                <CardTitle className="text-destructive flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5" /> Error Fetching Data
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-destructive">{error}</p>
                                <Button variant="destructive" size="sm" onClick={fetchUser} className="mt-4">
                                    Try Again
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                ) : user ? (
                    <Card className="w-full max-w-2xl mx-auto"> {/* Center card and limit width */}
                        <CardHeader>
                            <CardTitle className="text-2xl">Welcome, {user.name || 'User'}</CardTitle>
                            <CardDescription className="flex items-center space-x-2 pt-1"> {/* Use flex for alignment */}
                                <Mail className="h-4 w-4 text-muted-foreground" /> {/* Optional: Add mail icon */}
                                <span>{user.email}</span>
                                {user.emailVerification ? (
                                    <span className="flex items-center text-xs text-green-600 dark:text-green-400 bg-green-100/50 dark:bg-green-900/30 px-1.5 py-0.5 rounded-full">
                                        <CheckCircle2 className="h-3 w-3 mr-1" /> Verified
                                    </span>
                                ) : (
                                    <span className="flex items-center text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-100/50 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded-full">
                                        <AlertCircle className="h-3 w-3 mr-1" /> Not Verified
                                    </span>
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"> {/* Use grid for better layout */}
                            {/* Column 1 */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">User ID:</span>
                                    <code className="text-sm text-muted-foreground bg-muted px-1 rounded">{user.$id}</code>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Status:</span>
                                    {user.status ? (
                                        <Badge variant="outline" className="text-green-600 border-green-600/50">
                                            <CheckCircle2 className="h-3 w-3 mr-1" /> Active
                                        </Badge>
                                    ) : (
                                        <Badge variant="destructive">
                                            <AlertCircle className="h-3 w-3 mr-1" /> Inactive
                                        </Badge>
                                    )}
                                </div>
                                {user.phone && (
                                    <div className="flex items-center space-x-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Phone:</span>
                                        <span className="text-sm text-muted-foreground">{user.phone}</span>
                                        {user.phoneVerification ? (
                                            <Badge variant="outline" className="text-green-600 border-green-600/50 text-xs">Verified</Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-yellow-600 border-yellow-600/50 text-xs">Not Verified</Badge>
                                        )}
                                    </div>
                                )}
                                <div className="flex items-center space-x-2">
                                    <KeyRound className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">MFA:</span>
                                    {user.mfa ? (
                                        <Badge variant="outline" className="text-green-600 border-green-600/50">
                                            <ShieldCheck className="h-3 w-3 mr-1" /> Enabled
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary">
                                            <ShieldAlert className="h-3 w-3 mr-1" /> Disabled
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Registered:</span>
                                    <span className="text-sm text-muted-foreground">{formatDate(user.registration)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Last Updated:</span>
                                    <span className="text-sm text-muted-foreground">{formatDate(user.$updatedAt)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Last Accessed:</span>
                                    <span className="text-sm text-muted-foreground">{formatDate(user.accessedAt)}</span>
                                </div>
                                <div>
                                    <strong className="text-sm font-medium">Roles:</strong>
                                    {user.labels && user.labels.length > 0 ? (
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {user.labels.map((label) => (
                                                <Badge key={label} variant="secondary">{label}</Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground mt-1">No labels assigned.</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-muted-foreground">No user data available.</p>
                    </div>
                )}
            </main>

        </div>
    )
}

export default MyAccountBody