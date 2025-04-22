"use client";

import UploadReportBody from "@/components/pages/Facilitator/Reports/Upload/UploadReportBody";
import Footer from "@/components/pages/Footer";
import Navbar from "@/components/pages/Navbar";
import Head from "next/head";
import { Toaster } from "react-hot-toast"; // Keep toaster if needed for lookup actions

export default function ParticipantLookup() {
    return (
        <>
            <Head>
                <title>Upload Progress Reports | Arcade Progress Tracker</title>
                <meta name="description" content="View all your progress reports in this page" />
                
                <meta name="robots" content="noindex" />
                <meta name="googlebot" content="noindex" />
            </Head>

            <Navbar />
            <UploadReportBody />
            <Footer />

            <Toaster position="bottom-right" />
        </>
    );
}