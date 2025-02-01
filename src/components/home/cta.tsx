"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CTASection() {
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle email submission here
        console.log("Email submitted:", email)
    }

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-400">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-10">
                <div className="absolute right-0 top-0 w-full h-full border-[40px] border-white rounded-full transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute right-0 bottom-0 w-full h-full border-[40px] border-white rounded-full transform translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left column - Text content */}
                    <div className="text-white space-y-4 md:space-y-6 max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">Get 5% off your 1st app booking</h2>
                        <p className="text-md md:text-lg opacity-90">Booking's better on the app. Use promo code "TourBooking" to save!</p>
                        <p className="text-md md:text-lg">Get a magic link sent to your email</p>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                            <Input
                                id='id'
                                type="email"
                                name="email"
                                value={email}
                                placeholder="e.g. jhondoe@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 px-4 rounded-full border-gray-400 text-gray-700 dark:text-white"
                                required
                            />
                            <Button type="submit" className="h-12 bg-teal-600 hover:bg-teal-700 text-white px-8 rounded-full">
                                Send
                            </Button>
                        </form>
                    </div>

                    {/* Right column */}
                    <div className="relative h-[250px] md:h-fit flex flex-col items-center justify-center space-y-2">
                        <Image
                            src="/images/appstore.svg"
                            alt="App Store"
                            width={220}
                            height={220}
                            className="mr-2"
                        />
                        <span className="text-white">Download on the App Store</span>

                        <Image
                            src="/images/playstore.svg"
                            alt="Google Play"
                            width={220}
                            height={220}
                            className="mr-2"
                        />
                        <span className="text-white">Get it on Google Play</span>
                    </div>
                </div>
            </div>
        </section>
    )
}