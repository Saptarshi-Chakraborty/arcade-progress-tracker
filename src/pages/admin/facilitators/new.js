import AddNewFacilitatorBody from '@/components/pages/Admin/Facilitators/AddNew/AddNewFacilitatorBody';
import ViewAllFacilitatorsBody from '@/components/pages/Admin/Facilitators/ViewAll/Body';
import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/Navbar';
import { useGlobalContext } from '@/contexts/GlobalProvider';
import Head from 'next/head';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

const AllFacilitators = () => {
    const { user, fetchUser } = useGlobalContext();

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, [fetchUser]);

    return (
        <>
            <Head>
                <title>Add New Facilitators | Admin | Arcade Progress Tracker</title>

                <meta name="robots" content="noindex" />
                <meta name="googlebot" content="noindex" />
            </Head>

            <Navbar />
            <AddNewFacilitatorBody />
            <Footer />

            <Toaster position="bottom-right" />
        </>
    );
};

// export default withAuth(AdminDashboardPage); // Example with auth wrapper
export default AllFacilitators;