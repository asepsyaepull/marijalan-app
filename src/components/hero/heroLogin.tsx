import Image from 'next/image';

export default function HeroLoginSection() {
    return (
        <div className="relative hidden lg:flex flex-col w-full bg-black/30 p-8">
            <div className="mt-auto mb-32 space-y-4">
                <div className="flex items-center gap-2">
                    <Image src="/iconLogo.svg" alt="Logo" className="h-6" width={24} height={24} />
                    <Image src="/textLogo.svg" alt="Logo" className="h-8 filter invert" width={32} height={32} />
                </div>
                <h1 className="text-5xl font-bold text-white leading-tight">
                    Let&apos;s Travel The<br />Beautiful World<br />Together
                </h1>
                <p className="text-white/80 text-lg max-w-md">
                    We always make our customer happy by providing as many choices as possible
                </p>
                <p>Don&apos;t have an account? Sign up</p>
            </div>
        </div>
    );
}