"use client"; // Ensure this is a client component

import React from 'react';
import { useRouter } from 'next/router'; // Updated import
import Link from 'next/link'; // Updated import
import { Moon, Sun } from "lucide-react"; // Add icon imports
import { useTheme } from "next-themes"; // Add theme hook import
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Add dropdown components

const Navbar = () => {
  const router = useRouter(); // Updated to use Next.js router
  const pathname = router.pathname; // Updated to use Next.js router
  console.log('Current Pathname:', pathname); // Debugging line

  // Placeholder for authentication state - replace with actual auth logic
  const isAdminLoggedIn = true; // Assume logged in for admin paths for now

  const isPublicLookup = pathname === '/';
  const isAdminLogin = pathname === '/admin/login';
//   const isAdminSection = pathname.startsWith('/admin/') && !isAdminLogin;
  const isAdminSection = true; // Assume admin section for now, replace with actual logic
//   const isPublicReport = pathname.startsWith('/progress'); // Adjust if your report path is different
  const isPublicReport = false ;

  const getAppName = () => {
    if (isAdminLogin) return "Arcade Progress Checker - Admin";
    if (isAdminSection) return "Arcade Progress Checker - Admin";
    return "Arcade Progress Checker";
  };

  // Theme toggle component
  function ThemeToggle() {
    const { setTheme } = useTheme();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="border-primary/20 dark:border-primary/20">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: App Logo/Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300">
              {getAppName()}
            </Link>
          </div>

          {/* Right Side: Conditional Links/Buttons */}
          <div className="flex items-center space-x-4">
            {isPublicLookup && (
              <Button asChild variant="outline" className="border-gray-300 dark:border-gray-600">
                <Link href="/admin/login">Admin Login</Link>
              </Button>
            )}

            {(isPublicReport || isAdminLogin) && (
              <Button asChild variant="outline" className="border-gray-300 dark:border-gray-600">
                <Link href="/">Back to Lookup</Link>
              </Button>
            )}

            {isAdminSection && isAdminLoggedIn && (
              <>
                {/* Admin Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                  <Link href="/admin/dashboard" className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/admin/dashboard' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' 
                      : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}>Dashboard</Link>
                  <Link href="/admin/upload" className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/admin/upload' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' 
                      : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}>Upload Report</Link>
                  <Link href="/admin/participants" className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/admin/participants' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' 
                      : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}>Participants</Link>
                </div>

                {/* Admin User Menu */}
                <div className="flex items-center space-x-2">
                  <ThemeToggle />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Welcome, Admin</span>
                  {/* Add actual logout functionality here */}
                  <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200" onClick={() => alert('Logout clicked!')}>Logout</Button>
                </div>
              </>
            )}
            {/* If not admin section, still show theme toggle */}
            {!isAdminSection && (
              <ThemeToggle />
            )}
          </div>
        </div>
      </div>
      {/* Add mobile menu container here if implementing */}
    </nav>
  );
};

export default Navbar;