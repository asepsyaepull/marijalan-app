import Link from 'next/link';
import { Instagram, Twitter, Facebook, Music } from 'lucide-react';

const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/asepsyaepull' },
    { icon: Twitter, href: 'https://twitter.com' },
    { icon: Facebook, href: 'https://facebook.com' },
    { icon: Music, href: 'https://tiktok.com' },
];

export default function FooterSocial() {
    return (
        <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, href }) => (
                <Link
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon size={20} />
                </Link>
            ))}
        </div>
    );
}