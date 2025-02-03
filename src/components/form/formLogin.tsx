'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import useLogin from '@/hooks/useLogin';
import { useRouter } from 'next/router';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoading, handleLogin } = useLogin();
    const router = useRouter()

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="w-full max-w-md mx-auto p-8">
            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center space-x-3 mb-6">
                        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleBack}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="text-lg font-semibold">Back</h1>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome back!</h1>
                    <p className="text-gray-800 dark:text-white">
                        Start your journey with one click, explore the beautiful world! Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-orange-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-800 dark:text-white">Email Address</label>
                        <Input
                            id='id'
                            type="email"
                            name="email"
                            value={email}
                            placeholder="e.g. jhondoe@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 border-gray-400 text-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-800 dark:text-white">Password</label>
                        <div className="relative">
                            <Input
                                id='id'
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12 pr-10 border-gray-400 text-gray-700 dark:text-white"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium text-gray-800 dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me?
                            </label>
                        </div>
                        <Link
                            href="/forgot-password"
                            className="text-sm text-orange-500 hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className="w-full rounded-full h-12 text-white bg-orange-500 hover:bg-orange-500/90"
                        disabled={isLoading}
                    >
                        {isLoading ? <><Loader2 className="animate-spin" /> Loading...</> : 'Login'}
                    </Button>
                    {/* <div className="relative"></div>
                        <div className="absolute inset-0 flex items-center"></div>
                            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm"></div>
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                        <button
                            type="button"
                            className="w-12 h-12 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            className="w-12 h-12 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
                        >
                            <img src="https://www.facebook.com/favicon.ico" alt="Meta" className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            className="w-12 h-12 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
                        >
                            <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5" />
                        </button>
                    </div> */}
                </form>
            </div>
        </div>
    );
}