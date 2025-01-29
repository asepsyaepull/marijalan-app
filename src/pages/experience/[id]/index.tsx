'use client';

import * as React from "react"
import { MapPin } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import QuickInfo from './components/quickInfo';
import useExperienceId from '@/hooks/useExperienceId';
import Layout from '@/components/layout';
import Gallery from './components/gallery';
import { Progress } from "@radix-ui/react-progress";
import QuickInfoFloatingButton from "./components/quickInfoFloatingButton";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";

export default function ExperienceDetail() {
    const { data, isLoading, error } = useExperienceId();
    const [progress, setProgress] = React.useState(13);
    const [isMobile, setIsMobile] = React.useState(false);
    const breadcrumbItems = useBreadcrumb();

    const createMarkup = (htmlContent: string) => {
        return { __html: htmlContent };
    };

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, []);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isLoading) {
        return (
            <div className="container mx-auto items-center justify-center">
                <Progress value={progress} className="w-[60%]" />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <Layout>
            <div className="p-4 md:p-8 lg:p-10 space-y-4 md:space-y-8 lg:space-y-10">
                {/* Breadcrumb */}
                <CustomBreadcrumb items={breadcrumbItems} className="max-w-7xl px-4 md:mx-auto" />
                <div className="max-w-7xl px-4 md:mx-auto">
                    {/* Title Section */}
                    <div className="mt-6 mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {data?.title}
                        </h1>
                        <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">
                                {data?.address}, {data?.city}, {data?.province}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Gallery */}
                            <Gallery />

                            {/* Experience Description */}
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-semibold mb-4">What You'll Experience</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {data?.description}
                                </p>
                            </div>

                            {/* What's Included */}
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-semibold mb-4">What's included</h2>
                                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                                    {data?.facilities.split(',').map((facility, index) => (
                                        <li key={index}>{facility}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Location Map */}
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-semibold mb-4">Location</h2>
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                                    <p className="text-gray-600">{data?.address}</p>
                                </div>
                                <div className="mt-4 w-full h-fit overflow-auto" dangerouslySetInnerHTML={createMarkup(
                                    data?.location_maps || '')}>
                                </div>
                            </div>

                            {/* FAQ */}
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-semibold mb-4">FAQ</h2>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="refund">
                                        <AccordionTrigger>Can I get the refund?</AccordionTrigger>
                                        <AccordionContent>
                                            Yes, refunds are available according to our cancellation policy.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="date-change">
                                        <AccordionTrigger>Can I change the experience date?</AccordionTrigger>
                                        <AccordionContent>
                                            Yes, you can change the experience date. Just log into your account, go to your bookings, and select the experience you wish to modify. From there, you can choose a new date that works for you!
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="tour-end">
                                        <AccordionTrigger className="text-start">When and where does the tour end?</AccordionTrigger>
                                        <AccordionContent>
                                            The tour ends back at your hotel or a designated drop-off point in Bali.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>

                        {/* Quick Information Sidebar */}
                        {!isMobile && <QuickInfo />}
                    </div>
                </div>
            </div>
            {isMobile && <QuickInfoFloatingButton />}
        </Layout>
    );
}