"use client";

import FacilitatorNavbar from "@/components/pages/Example/FacilitatorNavbar";
import ExampleAlternateViewBody from "@/components/pages/Example/Participants/AlternateViewBody";
import Footer from "@/components/pages/Footer";
import Head from "next/head";
import { Toaster } from "react-hot-toast"; // Keep toaster if needed for lookup actions

export default function ParticipantLookup() {
    return (
        <>
            <Head>
                <title>Participants Alternate View | Example | Arcade Progress Tracker</title>
            </Head>

            <FacilitatorNavbar />
            <ExampleAlternateViewBody />
            <Footer />

            <Toaster position="bottom-right" />
        </>
    );
}