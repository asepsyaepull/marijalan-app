import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface LogoProps {
    className ?: string;
}

export default function Logo({ className }: LogoProps) {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push('/');
    };

    return (
        <div className={`flex items-center gap-1 ${className}`} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <Image src="/iconLogo.svg" alt="Logo" width={40} height={40} />
            <Image src="/textLogo.svg" alt="Logo" width={108} height={108} className="filter dark:invert" />
        </div>
    );
};