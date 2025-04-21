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
            if (!user.$id) {
                toast.error("User not logged in..."); // Show error if user is not logged in
                return
            }

            setUser(userData); // Set user

            if (userData?.lablels && userData.lablels.includes("admin"))
                setIsAdminLoggedIn(true); // Set admin logged in state

            if (userData?.lablels && userData.lablels.includes("facilitator"))
                setIsFacilitatorLoggedIn(false); // Set user logged in state

        } catch (error) {
            console.log("User not logged in...")
        }
    }

    return (
        <GlobalContext.Provider value={{ user, setUser, fetchUser, isAdminLoggedIn, isFacilitatorLoggedIn }}>
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