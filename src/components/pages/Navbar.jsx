"use client"; // Ensure this is a client component

import React from 'react';
import { useRouter } from 'next/router'; // Updated import
import Link from 'next/link'; // Updated import
import { Moon, Sun, LogOut, LayoutDashboard, Upload, Users } from "lucide-react"; // Add all needed icons
import { useTheme } from "next-themes"; // Add theme hook import
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Add dropdown components
import { useGlobalContext } from '@/contexts/GlobalProvider';

const Navbar = () => {
  const {user, fetchUser, isAdminLoggedIn, isFacilitatorLoggedIn} = useGlobalContext();
  const router = useRouter(); 
  
  const pathname = router.pathname; 
  console.log('Current Pathname:', pathname); 

  
  const isPublicLookup = pathname === '/';
  const isAdminLogin = pathname === '/admin/login';
  const isAdminSection = pathname.startsWith('/admin/') && !isAdminLogin;
  const isMyAccount = pathname === '/my-account';
  const isPublicReport = pathname.startsWith('/progress');

  const getAppName = () => {
    if (isAdminLogin || isAdminSection) return "Arcade Progress Checker - Admin";
    return "Arcade Progress Checker";
  };

  

  const handleLogout = async () => {
    // Add actual logout logic here
    console.log("Logout clicked");
    alert('Logging out...');
    // router.push('/admin/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-gray-700">
      <div className="container flex h-16 items-center justify-between">
        {/* Left Side: App Logo/Name */}
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {getAppName()}
            </span>
          </Link>

          {/* Admin Navigation - show only in admin section */}
          {isAdminSection && isAdminLoggedIn && (
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 ml-6">
              <Link href="/admin/dashboard" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${
                pathname === '/admin/dashboard' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' 
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}>
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <Link href="/admin/upload" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${
                pathname === '/admin/upload' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' 
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}>
                <Upload size={16} /> Upload Report
              </Link>
              <Link href="/admin/participants" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${
                pathname === '/admin/participants' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' 
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}>
                <Users size={16} /> Participants
              </Link>
            </nav>
          )}
        </div>

        {/* Right Side: Conditional Links/Buttons */}
        <div className="flex items-center space-x-4">
          {isPublicLookup && (
            <>
              <Button asChild variant="outline" className="border-gray-300 dark:border-gray-600">
                <Link href="/my-account">My Account</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-300 dark:border-gray-600">
                <Link href="/admin/login">Admin Login</Link>
              </Button>
            </>
          )}

          {isMyAccount && (
            <Button asChild variant="outline" className="border-gray-300 dark:border-gray-600">
              <Link href="/">Back to Lookup</Link>
            </Button>
          )}

          {(isPublicReport || isAdminLogin) && (
            <Button asChild variant="outline" className="border-gray-300 dark:border-gray-600">
              <Link href="/">Back to Lookup</Link>
            </Button>
          )}

          {isAdminSection && isAdminLoggedIn && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline">Welcome, Admin</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-1" /> Logout
              </Button>
            </div>
          )}
          
          {/* Theme toggle always visible */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
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

export default Navbar;