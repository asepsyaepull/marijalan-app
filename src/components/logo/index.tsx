import { FC } from 'react';
import iconLogo from '/public/iconLogo.svg';
import textLogo from '/public/textLogo.svg';

const Logo: FC = () => {
    return (
        <div className="flex items-center gap-2">
            <img src="/iconLogo.svg" alt="Logo" className="h-6" />
            <img src="/textLogo.svg" alt="Logo" className="h-8 filter dark:invert" />
        </div>
    );
};

export default Logo;