'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { RiUserSettingsLine, RiFileList3Line, RiFileTextLine } from "react-icons/ri";
import { useUser } from '@/context/UserContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import LogoutButton from '@/components/navbar/logout-button';

export default function ProfileSidebar() {
    const { user, loading } = useUser();
    const [imageError, setImageError] = useState(false);
    const router = useRouter();
    const currentPath = router.pathname;

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6 sticky top-24">
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
                    href="/profile"
                    className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === '/profile' ? 'bg-orange-50 text-orange-500 dark:bg-gray-700' : 'hover:bg-orange-50 dark:hover:bg-gray-700'}`}
                >
                    <RiUserSettingsLine className="w-5 h-5" />
                    <span>Profile Settings</span>
                </Link>
                <Link
                    href="/orders"
                    className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === '/orders' ? 'bg-orange-50 text-orange-500 dark:bg-gray-700' : 'hover:bg-orange-50 dark:hover:bg-gray-700'}`}
                >
                    <RiFileList3Line className="w-5 h-5" />
                    <span>My Orders</span>
                </Link>
                <Link
                    href="/terms"
                    className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === '/terms' ? 'bg-orange-50 text-orange-500 dark:bg-gray-700' : 'hover:bg-orange-50 dark:hover:bg-gray-700'}`}
                >
                    <RiFileTextLine className="w-5 h-5" />
                    <span>Terms & Conditions</span>
                </Link>
                <LogoutButton
                    className="flex text-md items-center gap-3 p-3 rounded-lg hover:text-red-700 hover:bg-orange-50 dark:hover:bg-gray-700" />
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