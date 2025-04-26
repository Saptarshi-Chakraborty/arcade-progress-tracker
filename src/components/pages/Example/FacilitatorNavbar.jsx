"use client"; // Ensure this is a client component

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Moon, Sun, LogOut, Upload, Users, FileSpreadsheet, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FacilitatorNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pathname, setPathname] = useState('');
  
  // Get the current pathname when the component mounts (client-side only)
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  // Mock logout function for the static navbar
  const handleLogout = () => {
    console.log("Logout clicked - this is a static example");
    closeMobileMenu();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-gray-700">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Left Side: App Logo/Name */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="mr-1 md:mr-2 flex items-center space-x-1 md:space-x-2">
            <Image
              src="/icons/icon-512.png"
              alt="App Logo"
              width={32}
              height={32}
              className="rounded-sm"
            />
            <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 ">
              Facilitator Panel
            </span>
          </Link>

          {/* Facilitator Navigation Links - hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-1 md:space-x-2 lg:space-x-4 ml-4 md:ml-6 cursor-pointer">
            <Link href="/example/upload-report" className={`px-2 md:px-3 py-2 rounded-md text-xs md:text-sm font-medium flex items-center gap-1 ${pathname === '/example/upload-report'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
              : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}>
              <Upload size={16} className="shrink-0" />
              <span className="hidden md:inline">Upload Report</span>
              <span className="md:hidden">Upload</span>
            </Link>

            <Link href="/example/view-reports" className={`px-2 md:px-3 py-2 rounded-md text-xs md:text-sm font-medium flex items-center gap-1 ${pathname === '/example/view-reports'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
              : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}>
              <FileSpreadsheet size={16} className="shrink-0" />
              <span className="hidden md:inline">Reports</span>
              <span className="md:hidden">Reps</span>
            </Link>

            <Link href="/example/participants" className={`px-2 md:px-3 py-2 rounded-md text-xs md:text-sm font-medium flex items-center gap-1 ${pathname === '/example/participants'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
              : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}>
              <Users size={16} className="shrink-0" />
              <span className="hidden md:inline">Participants</span>
              <span className="md:hidden">Parts</span>
            </Link>
          </nav>
        </div>

        {/* Right Side: Theme Toggle + Logout Button + Mobile Menu Button */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
          {/* Theme toggle always visible */}
          <ThemeToggle />

          {/* Logout button - shown on larger screens */}
          <Button
            variant="destructive"
            className="hidden sm:flex text-xs md:text-sm"
            onClick={handleLogout}
            size="sm"
          >
            <LogOut size={16} className="mr-0 md:mr-1 shrink-0" />
            <span className="hidden md:inline">Logout</span>
          </Button>

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
            {/* Facilitator Navigation Links - Mobile */}
            <Link 
              href="/example/upload-report" 
              onClick={closeMobileMenu} 
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                pathname === '/example/upload-report'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Upload size={18} /> Upload Report
            </Link>
            
            <Link 
              href="/example/view-reports" 
              onClick={closeMobileMenu} 
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                pathname === '/example/view-reports'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <FileSpreadsheet size={18} /> Reports
            </Link>
            
            <Link 
              href="/example/participants" 
              onClick={closeMobileMenu} 
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                pathname === '/example/participants'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Users size={18} /> Participants
            </Link>

            {/* Logout button in mobile menu */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              <LogOut size={18} /> Logout
            </button>
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

export default FacilitatorNavbar;