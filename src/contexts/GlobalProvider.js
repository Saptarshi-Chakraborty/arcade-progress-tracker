"use client";

import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import appwrite from '@/lib/appwrite';


const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // Placeholder for authentication state
    const [isFacilitatorLoggedIn, setIsFacilitatorLoggedIn] = useState(false); // Placeholder for authentication state
    const [user, setUser] = useState(null); // Placeholder for user name

    async function fetchUser() {
        try {
            const userData = await appwrite.account.get(); // Fetch user data from Appwrite
            console.log({ userData });

            if (userData['$id'] == undefined) {
                toast.error("User not logged in..."); // Show error if user is not logged in
                return;
            }

            setUser(userData); // Set user

            let userRoles = userData['labels'] || []; // Get user roles

            if (userRoles.includes("admin"))
                setIsAdminLoggedIn(true); // Set admin logged in state

            if (userRoles.includes("facilitator"))
                setIsFacilitatorLoggedIn(true); // Set user logged in state

        } catch (error) {
            console.log("User not logged in...")
        }
    }

    async function logoutUser() {
        let confirmLogout = confirm("Are you sure you want to log out?"); // Confirm logout action
        if (!confirmLogout) return; // If not confirmed, exit function

        try {
            await appwrite.account.deleteSession('current'); // Delete current session
            setUser(null); // Reset user state
            setIsAdminLoggedIn(false); // Reset admin logged in state
            setIsFacilitatorLoggedIn(false); // Reset user logged in state
            toast.success("Logged out successfully"); // Show success message
        } catch (error) {
            console.error("Logout error:", error); // Log error if any
        }
    }

    return (
        <GlobalContext.Provider value={{ user, setUser, fetchUser, logoutUser, isAdminLoggedIn, isFacilitatorLoggedIn }}>
            {children}
        </GlobalContext.Provider>
    );
}

const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
}

export { GlobalContext, GlobalContextProvider, useGlobalContext };
// This context will be used to manage global state such as authentication and user information.