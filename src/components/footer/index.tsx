import Logo from '../logo';
import FooterLinks from './footer-links';
import FooterSocial from './footer-social';

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-8 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-gray-600 dark:text-gray-300 max-w-xl">
                            Enjoy an unforgettable live music experience by purchasing your favorite concert tickets on Beatdrop. Get your tickets now and experience the true thrill of live music!
                        </p>
                    </div>
                    <FooterLinks />
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-800">
                    <FooterSocial />
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-4 md:mt-0">
                        © 2024 Marijalan Travel | All rights reserved | asepsya
                    </p>
                </div>
            </div>
        </footer>
    );
}