"use client";
import LookupBody from "@/components/pages/Lookup/LookupBody";
import Head from "next/head";
import { Toaster } from "react-hot-toast"; // Keep toaster if needed for lookup actions

export default function ParticipantLookup() {
    return (
        <>
            <Head>
                <title>Progress Reports | Arcade Progress Tracker</title>
                <meta name="description" content="View all your progress reports in this page" />
            </Head>
            <LookupBody />
            <Toaster position="bottom-right" />
        </>
    );
}