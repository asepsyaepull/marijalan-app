'use client';

import { useState, useEffect } from 'react';
import Logo from "../logo";
import AuthButtons from "./auth-button";
import NavLinks from "./nav-link";
import ThemeToggle from "./theme-toggle";
import UserNav from "./user-nav"; // Import UserNav component
import Cart from "./cart"; // Import Cart component
import { getCookie } from 'cookies-next'; // Import cookies-next

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in
        const token = getCookie('token'); // Get token from cookies
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="max-w-7xl px-4 md:mx-auto">
                <div className="flex h-16 items-center justify-between">
                    <Logo />
                    <div className="flex items-center gap-2 md:gap-8">
                        <div className="md:hidden flex items-center gap-4">
                            <ThemeToggle />
                        </div>
                        <NavLinks />
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        {isLoggedIn ? (
                            <>
                                <Cart />
                                <UserNav />
                            </>
                        ) : (
                            <AuthButtons />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}