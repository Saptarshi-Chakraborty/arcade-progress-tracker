"use client";

import FacilitatorNavbar from "@/components/pages/Example/FacilitatorNavbar";
import ExampleViewAllReportsBody from "@/components/pages/Example/ViewAllReportsBody";
import Footer from "@/components/pages/Footer";
import Head from "next/head";
import { Toaster } from "react-hot-toast"; // Keep toaster if needed for lookup actions

export default function ParticipantLookup() {
    return (
        <>
            <Head>
                <title>View All Reports | Example | Arcade Progress Tracker</title>
            </Head>

            <FacilitatorNavbar />
            <ExampleViewAllReportsBody />
            <Footer />

            <Toaster position="bottom-right" />
        </>
    );
}