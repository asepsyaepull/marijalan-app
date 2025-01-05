import Link from 'next/link';

type FooterSection = {
    title: string;
    links: Array<{
        label: string;
        href: string;
    }>;
};

const footerSections: FooterSection[] = [
    {
        title: 'Company',
        links: [
            { label: 'About us', href: '/about' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Who we works', href: '/team' },
        ],
    },
    {
        title: 'Quick links',
        links: [
            { label: 'Destination', href: '/destination' },
            { label: 'Promo', href: '/promo' },
            { label: 'Become Member', href: '/membership' },
        ],
    },
    {
        title: 'More',
        links: [
            { label: 'Customer Support', href: '/support' },
            { label: 'Terms & Conditions', href: '/terms' },
            { label: 'Privacy Policy', href: '/privacy' },
        ],
    },
];

export default function FooterLinks() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            {footerSections.map((section) => (
                <div key={section.title}>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                        {section.title}
                    </h3>
                    <ul className="space-y-3">
                        {section.links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}