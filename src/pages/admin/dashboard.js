import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import DashboardBody from '@/components/pages/Admin/Dashboard/DashboardBody';
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

            
        </>
    );
};

// export default withAuth(AdminDashboardPage); // Example with auth wrapper
export default AdminDashboardPage;