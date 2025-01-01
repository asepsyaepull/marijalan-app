import { FC } from 'react';
import iconLogo from '/public/iconLogo.svg';
import textLogo from '/public/textLogo.svg';

const Logo: FC = () => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-orange-500 font-bold text-2xl">MARIJALAN</span>
            <span className="text-white">Travel</span>

            {/* <img src={iconLogo} alt="Marijalan" className="w-8 h-8" />
            <img src={textLogo} alt="Marijalan Travel" className="w-8 h-8" /> */}
        </div>
    );
};

export default Logo;