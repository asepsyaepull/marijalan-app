import type React from "react"
import { useState, useEffect } from "react"
import Logo from "../logo"
import NavLinks from "./nav-link"
import ThemeToggle from "./theme-toggle"
import Cart from "./cart"
import UserNav from "./user-nav"
import AuthButtons from "./auth-button"
import { getCookie } from "cookies-next"

const Navbar: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in
        const token = getCookie('token'); // Get token from cookies
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md">
            <div className="max-w-7xl px-4 md:mx-auto flex items-center justify-between py-4">
                <Logo className="flex-shrink-0 w-20 pl-12 md:pl-0 md:w-32" />
                <div className="flex-1 flex items-center justify-center">
                    <NavLinks className="hidden md:flex" />
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                    <ThemeToggle className="md:hidden" />
                    {isLoggedIn && <Cart className="md:hidden" />}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        {isLoggedIn && <Cart />}
                    </div>
                    {isLoggedIn ? <UserNav /> : <AuthButtons />}
                </div>
            </div>
        </nav>
    )
}

export default Navbar