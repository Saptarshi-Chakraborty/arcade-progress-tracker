"use client";

import ExampleHomePageBody from "@/components/pages/Example/Home/Body";
import Footer from "@/components/pages/Footer";
import Navbar from "@/components/pages/Navbar";
import Head from "next/head";
import { Toaster } from "react-hot-toast"; // Keep toaster if needed for lookup actions

export default function ParticipantLookup() {

    return (
        <>
            <Head>
                <title>Home Page Example - Arcade Progress Tracker</title>
            </Head>

            <Navbar />
            <ExampleHomePageBody />
            <Footer />

            <Toaster position="bottom-right" />
        </>
    );
}
