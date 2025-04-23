"use client";

import FacilitatorNavbar from "@/components/pages/Example/FacilitatorNavbar";
import ExampleUploadReportBody from "@/components/pages/Example/UploadReportBody";
import Footer from "@/components/pages/Footer";
import Navbar from "@/components/pages/Navbar";
import Head from "next/head";
import { Toaster } from "react-hot-toast"; // Keep toaster if needed for lookup actions

export default function ParticipantLookup() {
    return (
        <>
            <Head>
                <title>Upload Progress Reports | Example | Arcade Progress Tracker</title>
            </Head>

            <FacilitatorNavbar />
            <ExampleUploadReportBody />
            <Footer />

            <Toaster position="bottom-right" />
        </>
    );
}