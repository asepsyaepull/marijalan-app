'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Settings, FileText, LogOut, Instagram, Facebook, Twitter } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

export default function ProfileSidebar() {
    const { user, loading } = useUser();
    const [imageError, setImageError] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6">
            {/* Profile Info */}
            <div className="flex flex-col items-center space-y-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                    {loading ? (
                        <Skeleton className="w-full h-full" />
                    ) : (
                        <Image
                            src={imageError ? '/default-image.png' : user?.profilePictureUrl || "https://images.unsplash.com/photo-163333"}
                            alt="Profile"
                            fill
                            className="object-cover"
                            onError={() => setImageError(true)}
                        />
                    )}
                </div>
                <div className="text-center">
                    <h3 className="font-semibold">{user?.name || "Guest"}</h3>
                    <p className="text-sm text-gray-500">{user?.email || "guest@example.com"}</p>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2">
                <Link
                    href="/profile/settings"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <Settings className="w-5 h-5" />
                    <span>Profile Settings</span>
                </Link>
                <Link
                    href="/orders"
                    className="flex items-center gap-3 p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                >
                    <FileText className="w-5 h-5" />
                    <span>My Orders</span>
                </Link>
                <Link
                    href="/terms"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <FileText className="w-5 h-5" />
                    <span>Terms & Conditions</span>
                </Link>
                <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </nav>

            {/* Footer */}
            <div className="pt-6 border-t">
                <p className="text-sm text-gray-500 mb-4">Follow us</p>
                <div className="flex gap-4">
                    <Link href="#" className="text-gray-400 hover:text-orange-500">
                        <Instagram className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-orange-500">
                        <Facebook className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-orange-500">
                        <Twitter className="w-5 h-5" />
                    </Link>
                </div>
                <p className="text-xs text-gray-400 mt-4">
                    Marijalan Travel v 0.0.1
                </p>
            </div>
        </div>
    );
}