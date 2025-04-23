"use client";

import FacilitatorNavbar from "@/components/pages/Example/FacilitatorNavbar";
import ExampleParticipantsBody from "@/components/pages/Example/Participants/ExampleBody";
import Footer from "@/components/pages/Footer";
import Head from "next/head";
import { Toaster } from "react-hot-toast"; // Keep toaster if needed for lookup actions

export default function ParticipantLookup() {
    return (
        <>
            <Head>
                <title>Participants Details | Example | Arcade Progress Tracker</title>
            </Head>

            <FacilitatorNavbar />
            <ExampleParticipantsBody />
            <Footer />

            <Toaster position="bottom-right" />
        </>
    );
}