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
            { label: 'About us', href: '/' },
            { label: 'Gallery', href: '/' },
            { label: 'Who we works', href: '/' },
        ],
    },
    {
        title: 'Quick links',
        links: [
            { label: 'Experience', href: '/experience' },
            { label: 'Promos', href: '/promos' },
            { label: 'Become Member', href: '/register' },
        ],
    },
    {
        title: 'More',
        links: [
            { label: 'Customer Support', href: '/' },
            { label: 'Terms & Conditions', href: '/' },
            { label: 'Privacy Policy', href: '/' },
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