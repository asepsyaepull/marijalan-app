'use client';

import { LogOut, User, Settings, CreditCard } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import useLogout from '@/hooks/useLogout';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/context/UserContext';

export default function UserNav() {
    const { user, loading } = useUser();
    const { isLoading, handleLogout } = useLogout();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    {loading ? (
                        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                    ) : (
                        <Avatar className="h-10 w-10 object-cover">
                            <AvatarImage
                                src={user?.profilePictureUrl || "/default-image.png"}
                                alt={user?.name || "User"}
                                onError={(e) => {
                                    e.currentTarget.src = "/default-image.png";
                                }}
                            />
                            <AvatarFallback>{user?.name?.charAt(0) || "A"}</AvatarFallback>
                        </Avatar>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user?.name || "Guest"}</p>
                        <p className="text-xs text-muted-foreground">{user?.email || "guest@example.com"}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={handleLogout} disabled={isLoading}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{isLoading ? 'Logging out...' : 'Log out'}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}