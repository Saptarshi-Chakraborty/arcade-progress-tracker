"use client"; // Ensure this is a client component

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Moon, Sun, LogOut, LayoutDashboard, Upload, Users, FileSpreadsheet, User, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGlobalContext } from '@/contexts/GlobalProvider';

const Navbar = () => {
  const { user, fetchUser, logoutUser, isAdminLoggedIn, isFacilitatorLoggedIn } = useGlobalContext();
  const router = useRouter();
  const pathname = router.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine the current section based on the pathname
  const isAdminSection = pathname.startsWith('/admin');

  const getAppName = () => {
    if (isAdminSection && isAdminLoggedIn) return "Admin Pannel";
    if (isFacilitatorLoggedIn) return "Facilitator Pannel";
    return "Arcade Progress Tracker";
  };

  const handleLogout = async () => {
    await logoutUser();
    router.push('/');
    fetchUser();
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Function to close mobile menu (useful for navigation)
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-gray-700">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: App Logo/Name */}
        <div className="flex items-center">
          <Link href="/" className="mr-2 flex items-center space-x-2">
            <Image 
              src="/icons/icon-512.png" 
              alt="App Logo" 
              width={32} 
              height={32} 
              className="rounded-sm"
            />
            <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 truncate">
              {getAppName()}
            </span>
          </Link>

          {/* Desktop Navigation - hidden on mobile */}
          {isAdminSection && isAdminLoggedIn && (
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 ml-6 cursor-pointer">
              <Link href="/admin/dashboard" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${pathname === '/admin/dashboard'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}>
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <Link href="/facilitator/reports/upload" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${pathname === '/admin/upload'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}>
                <Upload size={16} /> Upload Report
              </Link>
              <Link href="/admin/participants" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${pathname === '/admin/participants'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}>
                <Users size={16} /> Participants
              </Link>
              <Link href="/admin/facilitators" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${pathname.startsWith('/admin/facilitators')
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}>
                <User size={16} /> Facilitators
              </Link>
            </nav>
          )}

          {/* Facilitator Navigation - show when user is a facilitator and not in admin section */}
          {isFacilitatorLoggedIn && !isAdminSection && (
            <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 ml-6 cursor-pointer">
              <Link href="/facilitator/reports/upload" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${pathname === '/upload'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}>
                <Upload size={16} /> Upload Report
              </Link>

              <Link href="/facilitator/reports" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${pathname === '/reports'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}>
                <FileSpreadsheet size={16} /> Reports
              </Link>

              <Link href="/facilitator/participants" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${pathname === '/participants'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}>
                <Users size={16} /> Participants
              </Link>
            </nav>
          )}
        </div>

        {/* Right Side: Mobile Menu Button + Theme Toggle + User Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Theme toggle always visible */}
          <ThemeToggle />

          {/* Login button - shown when no user is logged in on larger screens */}
          {user === null && pathname !== "/login" && (
            <Button asChild variant="outline" className="border-gray-300 dark:border-gray-600 hidden sm:flex">
              <Link href="/login">Login</Link>
            </Button>
          )}

          {/* Logout button - shown when user is logged in on larger screens */}
          {user && (
            <Button variant="destructive" className="hidden sm:flex" onClick={handleLogout}>
              <LogOut size={16} className="mr-1" /> Logout
            </Button>
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-gray-300 dark:border-gray-600"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu - slides down when menu is open */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Admin Navigation Mobile */}
            {isAdminSection && isAdminLoggedIn && (
              <>
                <Link href="/admin/dashboard" onClick={closeMobileMenu} className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${pathname === '/admin/dashboard'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}>
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <Link href="/facilitator/reports/upload" onClick={closeMobileMenu} className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${pathname === '/admin/upload'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}>
                  <Upload size={18} /> Upload Report
                </Link>
                <Link href="/admin/participants" onClick={closeMobileMenu} className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${pathname === '/admin/participants'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}>
                  <Users size={18} /> Participants
                </Link>
                <Link href="/admin/facilitators" onClick={closeMobileMenu} className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${pathname.startsWith('/admin/facilitators')
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}>
                  <User size={18} /> Facilitators
                </Link>
              </>
            )}

            {/* Facilitator Navigation Mobile */}
            {isFacilitatorLoggedIn && !isAdminSection && (
              <>
                <Link href="/facilitator/reports/upload" onClick={closeMobileMenu} className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${pathname === '/upload'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}>
                  <Upload size={18} /> Upload Report
                </Link>
                <Link href="/facilitator/reports" onClick={closeMobileMenu} className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${pathname === '/reports'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}>
                  <FileSpreadsheet size={18} /> Reports
                </Link>
                <Link href="/facilitator/participants" onClick={closeMobileMenu} className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${pathname === '/participants'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}>
                  <Users size={18} /> Participants
                </Link>
              </>
            )}

            {/* Common mobile menu items */}
            {user === null && pathname !== "/login" && (
              <Link href="/login" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700">
                Login
              </Link>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
              >
                <LogOut size={18} /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Theme toggle component
function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="border-primary/20 dark:border-primary/20 cursor-pointer">
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