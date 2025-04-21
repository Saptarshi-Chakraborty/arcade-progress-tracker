import Navbar from '@/components/pages/Navbar';
import Footer from '../Footer';
// Assume appwrite and auth context logic will be added later for user name and logout

const AdminLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <main className="flex-1 container py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default AdminLayout;