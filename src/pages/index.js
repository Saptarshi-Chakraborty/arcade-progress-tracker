"use client";
import LookupBody from "@/components/pages/Lookup/LookupBody";
import Head from "next/head";
import { Toaster } from "react-hot-toast"; // Keep toaster if needed for lookup actions

export default function ParticipantLookup() {
    return (
        <>
            <Head>
                <title>Check Progress | Arcade Progress Tracker</title>
                <meta name="description" content="Check your Google Cloud Arcade program progress." />
            </Head>
            <LookupBody />
            <Toaster position="bottom-right" />
        </>
    );
}
