'use client';

import Logo from "../logo";
import AuthButtons from "./auth-button";
import NavLinks from "./nav-link";
import ThemeToggle from "./theme-toggle";



export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
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
                        <AuthButtons />
                    </div>
                </div>
            </div>
        </header>
    );
}