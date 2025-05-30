"use client";

import Footer from "@/components/pages/Footer";
import HomePageBody from "@/components/pages/Index/Body";
import Navbar from "@/components/pages/Navbar";
import Head from "next/head";
import { Toaster } from "react-hot-toast"; // Keep toaster if needed for lookup actions

export default function ParticipantLookup() {

    return (
        <>
            <Head>
                <title>Arcade Progress Tracker - Arcade Facilitator</title>
                <meta name="description" content="Check your Google Cloud Arcade program progress." />
            </Head>

            <Navbar />
            <HomePageBody />
            <Footer />

            <Toaster position="bottom-right" />
        </>
    );
}
