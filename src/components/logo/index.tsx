import { FC } from 'react';
import Image from 'next/image';

const Logo: FC = () => {
    return (
        <div className="flex items-center gap-1">
            <Image src="/iconLogo.svg" alt="Logo" width={40} height={40} />
            <Image src="/textLogo.svg" alt="Logo" width={108} height={108} className="filter dark:invert" />
        </div>
    );
};

export default Logo;