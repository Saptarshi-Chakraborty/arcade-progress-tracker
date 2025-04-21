"use client";

import Footer from "@/components/pages/Footer";
import LoginBody from "@/components/pages/Login/LoginBody";
import Navbar from "@/components/pages/Navbar";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function Login() {
    const { user } = useGlobalContext(); // Get user from global context

    return (<>
        <Head>
            <title>Login | Arcade Progress Tracker</title>
        </Head>

        <Navbar />
        <LoginBody />
        <Footer />

        <Toaster />

    </>)
}