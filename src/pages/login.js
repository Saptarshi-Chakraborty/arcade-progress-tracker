"use client";

import LoginBody from "@/components/pages/Login/LoginBody";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function Login() {
    return (<>
        <Head>
            <title>Login | Arcade Progress Tracker</title>
        </Head>

        <LoginBody />

        <Toaster />

    </>)
}