"use client";

import ParticipantsBody from "@/components/pages/Facilitator/Participants/Body";
import Footer from "@/components/pages/Footer";
import Navbar from "@/components/pages/Navbar";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function ParticipantsPage() {
    return (
        <>
            <Head>
                <title>Participants | Arcade Progress Tracker</title>
                <meta name="description" content="View all participants and their progress details" />
               
                <meta name="robots" content="noindex" />
                <meta name="googlebot" content="noindex" />
            </Head>

            <Navbar />
            <ParticipantsBody />
            <Footer />

            <Toaster position="bottom-right" />
        </>
    );
}