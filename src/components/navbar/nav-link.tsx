'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const links = [
    { href: '/', label: 'Home' },
    { href: '/destination', label: 'Destination' },
    { href: '/promos', label: 'Promos' },
];

export default function NavLinks() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

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

                {isOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
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
                                </div>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </>
    );
}