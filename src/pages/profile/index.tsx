"use client"

import ProfileSidebar from "@/components/profileSidebar/profileSidebar"
import Layout from "@/components/layout"
import UpdateProfile from "./components/updateProfile"

export default function ProfileSettings() {

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 lg:p-10 space-y-4 md:space-y-8 lg:space-y-10">
                <div className="max-w-7xl px-4 md:mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <ProfileSidebar />
                        </div>

                        {/* Main Content */}
                        <main className="lg:col-span-3 space-y-6">
                            {/* Header */}
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Profile Settings
                            </h1>

                            {/* Profile */}
                            <UpdateProfile />

                        </main>
                    </div>
                </div>
            </div>
        </Layout>
    )
}