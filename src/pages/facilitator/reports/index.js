"use client";
import ViewAllReportsBody from "@/components/pages/Facilitator/Reports/ViewAll/Body";
import Footer from "@/components/pages/Footer";
import Navbar from "@/components/pages/Navbar";
import Head from "next/head";
import { Toaster } from "react-hot-toast"; // Keep toaster if needed for lookup actions

export default function ParticipantLookup() {
    return (
        <>
            <Head>
                <title>Progress Reports | Arcade Progress Tracker</title>
                <meta name="description" content="View all your progress reports in this page" />
            </Head>

            <Navbar />
            <ViewAllReportsBody />
            <Footer />

            <Toaster position="bottom-right" />
        </>
    );
}