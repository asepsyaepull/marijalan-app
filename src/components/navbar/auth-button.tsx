import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthButtons() {
    return (
        <div className="flex items-center gap-2 md:gap-4">
            <Link href="/login">
                <Button variant="ghost" className="text-gray-700 dark:text-gray-200">
                    Login
                </Button>
            </Link>
            <Link href="/register">
                <Button className="bg-primary text-white">
                    Register
                </Button>
            </Link>
        </div>
    );
}