"use client";

import Footer from "@/components/pages/Footer";
import HomePageBody from "@/components/pages/Index/Body";
import Navbar from "@/components/pages/Navbar";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast"; // Keep toaster if needed for lookup actions

export default function ParticipantLookup() {
    const { user, fetchUser } = useGlobalContext();
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Check Progress | Arcade Progress Tracker</title>
                <meta name="description" content="Check your Google Cloud Arcade program progress." />
            </Head>

            <Navbar />
            <HomePageBody />
            <Footer />

            <Toaster position="bottom-right" />
        </>
    );
}
