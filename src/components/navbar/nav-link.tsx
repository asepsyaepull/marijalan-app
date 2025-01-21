'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCookie } from 'cookies-next'; // Import cookies-next
import UserNav from './user-nav'; // Import UserNav component
import Cart from './cart'; // Import Cart component

const links = [
    { href: '/', label: 'Home' },
    { href: '/destination', label: 'Destination' },
    { href: '/promos', label: 'Promos' },
];

export default function NavLinks() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Check if the user is logged in
        const token = getCookie('token'); // Get token from cookies
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
                {links.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                            'text-sm font-medium transition-colors hover:text-orange-500',
                            pathname === href
                                ? 'text-orange-500'
                                : 'text-gray-700 dark:text-gray-200'
                        )}
                    >
                        {label}
                    </Link>
                ))}
            </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-gray-700 dark:text-gray-200"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div
                    className={cn(
                        'fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-lg transform transition-transform',
                        isOpen ? 'translate-x-0' : 'translate-x-full'
                    )}
                >
                    <nav className="flex flex-col p-4">
                        {links.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    'px-4 py-2 text-sm font-medium transition-colors',
                                    pathname === href
                                        ? 'text-orange-500'
                                        : 'text-gray-700 dark:text-gray-200'
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                        <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex flex-col gap-2">
                                {isLoggedIn ? (
                                    <>
                                        <Cart />
                                        <UserNav />
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="w-full px-4 py-2 text-sm font-medium text-center text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="w-full px-4 py-2 text-sm font-medium text-center text-white bg-primary rounded-md"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}