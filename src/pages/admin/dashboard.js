import Head from 'next/head';
import AdminLayout from '@/components/pages/Admin/AdminLayout';
import DashboardBody from '@/components/pages/Admin/Dashboard/DashboardBody';
import { Toaster } from 'react-hot-toast';
// Add authentication wrapper here later if needed
// import { withAuth } from '@/utils/withAuth'; // Example

const AdminDashboardPage = () => {
    return (
        <>
            <Head>
                <title>Admin Dashboard | Arcade Progress Tracker</title>
            </Head>
            <AdminLayout>
                <DashboardBody />
            </AdminLayout>

            <Toaster position="bottom-right" />
        </>
    );
};

// export default withAuth(AdminDashboardPage); // Example with auth wrapper
export default AdminDashboardPage;