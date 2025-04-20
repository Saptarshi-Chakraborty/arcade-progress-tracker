import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, Upload, Users } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
// Assume appwrite and auth context logic will be added later for user name and logout
// import { useAuth } from '@/context/AuthContext'; // Example
// import appwrite from '@/lib/appwrite';

const AdminLayout = ({ children }) => {
    // const { user, logout } = useAuth(); // Example usage
    const adminName = "Admin User"; // Placeholder

    const handleLogout = async () => {
        // await logout(); // Example usage
        console.log("Logout clicked");
        // Redirect to login page
        // window.location.href = '/login';
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-gray-700">
                <div className="container flex h-14 items-center">
                    <Link href="/admin/dashboard" className="mr-6 flex items-center space-x-2">
                        {/* Add Logo here if available */}
                        <span className="font-bold sm:inline-block">Arcade Progress Checker</span>
                    </Link>
                    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
                        <Link href="/admin/dashboard" className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1">
                            <LayoutDashboard size={16} /> Dashboard
                        </Link>
                        <Link href="/admin/upload" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
                            <Upload size={16} /> Upload Report
                        </Link>
                        <Link href="/admin/participants" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
                            <Users size={16} /> Participants
                        </Link>
                    </nav>
                    <div className="flex flex-1 items-center justify-end space-x-4">
                        <span className="text-sm text-muted-foreground hidden sm:inline">Welcome, {adminName}</span>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <LogOut size={16} className="mr-1" /> Logout
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex-1 container py-8">
                {children}
            </main>
             <Toaster position="bottom-right" />
            <footer className="py-4 border-t dark:border-gray-700">
                <div className="container text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Arcade Progress Checker Admin Panel
                </div>
            </footer>
        </div>
    );
};

export default AdminLayout;