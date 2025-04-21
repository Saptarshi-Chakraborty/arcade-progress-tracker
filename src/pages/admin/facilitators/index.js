import ViewAllFacilitatorsBody from '@/components/pages/Admin/Facilitators/ViewAll/Body';
import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/Navbar';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
// Add authentication wrapper here later if needed
// import { withAuth } from '@/utils/withAuth'; // Example

const AllFacilitators = () => {
    return (
        <>
            <Head>
                <title>All Facilitators | Admin | Arcade Progress Tracker</title>
            </Head>

            <Navbar />
            <ViewAllFacilitatorsBody />
            <Footer />

            <Toaster position="bottom-right" />
        </>
    );
};

// export default withAuth(AdminDashboardPage); // Example with auth wrapper
export default AllFacilitators;