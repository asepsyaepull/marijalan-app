"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useUser } from "@/context/UserContext"
import { Skeleton } from "@/components/ui/skeleton"
import useLogout from "@/hooks/useLogout"
import { RiFileList3Line, RiFileTextLine, RiUser3Line } from "react-icons/ri";

export default function UserNav() {
    const { user, loading } = useUser()
    const { isLoading, handleLogout } = useLogout()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const router = useRouter()

    const handleLogoutNav = async () => {
        setIsDropdownOpen(false)
        await handleLogout()
    }

    const handleNavigation = (path: string) => {
        setIsDropdownOpen(false)
        router.push(path)
    }

    const handleLogoutClick = () => {
        setIsAlertOpen(true)
    }

    const handleConfirmLogout = async () => {
        setIsAlertOpen(false)
        await handleLogoutNav()
    }

    const handleCancelLogout = () => {
        setIsAlertOpen(false)
    }

    return (
        <>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        {loading ? (
                            <Skeleton className="h-10 w-full rounded-full" />
                        ) : (
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={user?.profilePictureUrl || "/default-avatar.png"} alt={user?.name || "User avatar"} />
                                <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                            </Avatar>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user?.name || "Guest"}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user?.email || "guest@example.com"}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => handleNavigation("/profile")} className="hover:cursor-pointer">
                            <RiUser3Line className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleNavigation("/orders")} className="hover:cursor-pointer">
                            <RiFileList3Line className="mr-2 h-4 w-4" />
                            <span>My Orders</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleNavigation("/settings")} className="hover:cursor-pointer">
                            <RiFileTextLine className="mr-2 h-4 w-4" />
                            <span>Terms & Condition</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 focus:text-red-600 hover:cursor-pointer" onClick={handleLogoutClick}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                        <AlertDialogDescription>Are you sure you want to log out?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancelLogout} disabled={isLoading}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmLogout}
                            disabled={isLoading}
                            className={`bg-red-500 hover:bg-red-600 focus:ring-red-500 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Logging Out...
                                </>
                            ) : (
                                <>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </>
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}