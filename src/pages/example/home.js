"use client";

import ExampleHomePageBody from "@/components/pages/Example/Home/Body";
import UserNavbar from "@/components/pages/Example/UserNavbar";
import Footer from "@/components/pages/Footer";
import Head from "next/head";
import { Toaster } from "react-hot-toast"; // Keep toaster if needed for lookup actions

export default function ParticipantLookup() {

    return (
        <>
            <Head>
                <title>Home | Example | Arcade Progress Tracker</title>
            </Head>

            <UserNavbar />
            <ExampleHomePageBody />
            <Footer />

            <Toaster position="bottom-right" />
        </>
    );
}
