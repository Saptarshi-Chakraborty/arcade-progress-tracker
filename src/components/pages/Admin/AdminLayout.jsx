import Navbar from '@/components/pages/Navbar';
// Assume appwrite and auth context logic will be added later for user name and logout

const AdminLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <main className="flex-1 container py-8">
                {children}
            </main>
            <footer className="py-4 border-t dark:border-gray-700">
                <div className="container text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Arcade Progress Checker Admin Panel
                </div>
            </footer>
        </div>
    );
};

export default AdminLayout;