"use client";

import Footer from "@/components/pages/Footer";
import MyAccountBody from "@/components/pages/MyAccount/Body";
import Navbar from "@/components/pages/Navbar";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function DashboardPage() {

    return (
        <>
            <Head>
                <title>My Account | Arcade Progress Tracker</title>
            </Head>
            <Navbar />

            <MyAccountBody /> {/* Include MyAccountBody component */}

            <Footer /> {/* Include Footer component */}

            <Toaster position="bottom-right" />
        </>
    );
}
