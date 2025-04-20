"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Use next/router for Pages Router
import { toast } from 'react-hot-toast';
import { Github, LogIn } from 'lucide-react'; // Import icons

const LookupBody = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Placeholder - Replace with actual report date fetching logic
    const reportDate = new Date().toLocaleDateString();

    const handleCheckProgress = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter an email address.');
            return;
        }
        setIsLoading(true);
        // Basic email validation (optional, enhance as needed)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }

        // Simulate API call or data check
        console.log(`Checking progress for: ${email}`);
        // In a real app, you would fetch data here.
        // If found, navigate to the progress page.
        // If not found, show a toast message.

        // Example: Navigate to the dynamic progress page
        // Use encodeURIComponent to handle special characters in email
        router.push(`/progress/${encodeURIComponent(email)}`);

        // Simulate loading state ending (remove if navigation is immediate)
        // setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-gray-800">
                <div className="container flex h-14 items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        {/* Optional: Add Logo */}
                        <span className="font-bold">Arcade Progress Checker</span>
                    </Link>
                    <Link href="/login">
                        <Button variant="outline" size="sm">
                            <LogIn size={16} className="mr-1" /> Admin Login
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Check Your Arcade Program Progress
                        </h1>
                        <hr className="w-24 h-1 mx-auto my-2 bg-primary border-0 rounded" />
                    </div>

                    <form onSubmit={handleCheckProgress} className="space-y-4">
                        <div>
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Enter the email address you used for the program:
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1"
                                disabled={isLoading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Checking...' : 'CHECK PROGRESS'}
                        </Button>
                    </form>

                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                        Progress updated as of {reportDate}. Data provided by your facilitator.
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-4 border-t dark:border-gray-800">
                <div className="container flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground">
                    <span>Made by Your Name/Group</span> {/* Replace with actual credit */}
                    <a
                        href="https://github.com/your-repo" // Replace with your repo link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-primary"
                    >
                        <Github size={14} /> Source Code
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default LookupBody;