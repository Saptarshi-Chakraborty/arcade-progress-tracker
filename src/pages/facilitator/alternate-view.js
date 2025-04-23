"use client";

import AlternateViewBody from "@/components/pages/Facilitator/Alternate-View/Body";
import Footer from "@/components/pages/Footer";
import Navbar from "@/components/pages/Navbar";
import Head from "next/head";
import { Toaster } from "react-hot-toast"; // Keep toaster if needed for lookup actions

export default function ParticipantLookup() {

    return (
        <>
            <Head>
                <title>Participants Alternate View - Arcade Facilitator</title>
                <meta name="description" content="Check your Google Cloud Arcade program progress." />
            </Head>

            <Navbar />
            <AlternateViewBody />
            <Footer />

            <Toaster position="bottom-right" />
        </>
    );
}
