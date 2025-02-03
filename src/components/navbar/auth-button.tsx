import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';

export default function AuthButtons() {
    const router = useRouter();

    const handleLoginClick = () => {
        router.push(`/login?prev=${router.asPath}`);
    };

    return (
        <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-gray-700 dark:text-gray-200" onClick={handleLoginClick}>
                Login
            </Button>
            <Link href="/register">
                <Button className="bg-primary text-white">
                    Register
                </Button>
            </Link>
        </div>
    );
}