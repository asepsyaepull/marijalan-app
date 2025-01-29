"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, LogIn, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { getCookie } from "cookies-next"
import UserNav from "./user-nav"
import Cart from "./cart"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface NavLinksProps {
    className?: string;
}

const links = [
    { href: "/", label: "Home" },
    { href: "/experience", label: "Experience"},
    { href: "/promos", label: "Promos" },
]

export default function NavLinks({ className }: NavLinksProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const token = getCookie("token")
        setIsLoggedIn(!!token)
    }, [])

    interface NavItemProps {
        href: string;
        label: string;
    }

    const NavItem = ({ href, label }: NavItemProps) => (
        <Link
            href={href}
            className={cn(
                "flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                pathname === href
                    ? "text-orange-500 bg-orange-50 dark:bg-orange-900/20"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
            )}
        >
            <span>{label}</span>
        </Link>
    )

    return (
        <>
            {/* Desktop Navigation */}
            <nav className={cn(className, "hidden md:flex items-center space-x-4")}>
                {links.map((link) => (
                    <NavItem key={link.href} {...link} />
                ))}
            </nav>

            {/* Mobile Navigation */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden absolute left-4">
                        <Menu size={24} />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col space-y-4 mt-4">
                        {links.map((link) => (
                            <NavItem key={link.href} {...link} />
                        ))}
                        <div className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
                            {isLoggedIn ? (
                                <div className="space-y-4">
                                    <Cart />
                                    <UserNav />
                                </div>
                            ) : (
                                    <div className="space-y-4">
                                        <Link href="/login" passHref>
                                            <Button variant="outline" className="w-full justify-start">
                                                <LogIn className="mr-2 h-4 w-4" />
                                            Login
                                            </Button>
                                        </Link>
                                        <Link href="/register" passHref>
                                            <Button className="w-full justify-start bg-orange-500 hover:bg-orange-600">
                                                <UserPlus className="mr-2 h-4 w-4" />
                                            Register
                                            </Button>
                                        </Link>
                                    </div>
                            )}
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    )
}

