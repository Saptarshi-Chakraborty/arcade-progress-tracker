"use client"; // Ensure this is a client component

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Moon, Sun, Menu, X, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
              Arcade Progress Tracker
            </span>
          </Link>
        </div>

        {/* Right Side: Mobile Menu Button + Theme Toggle + Logout Button */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
          {/* Theme toggle always visible */}
          <ThemeToggle />
          
          {/* Logout button - visible on larger screens */}
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

export default UserNavbar;