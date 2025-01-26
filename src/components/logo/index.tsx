import { FC } from 'react';
import Image from 'next/image';

const Logo: FC = () => {
    return (
        <div className="flex items-center gap-2">
            <Image src="/iconLogo.svg" alt="Logo" width={24} height={24} />
            <Image src="/textLogo.svg" alt="Logo" width={32} height={32} className="filter dark:invert" />
        </div>
    );
};

export default Logo;