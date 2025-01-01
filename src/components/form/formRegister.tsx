'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, User, Users } from 'lucide-react';
import { Card } from '../ui/card';
import { Checkbox } from '@radix-ui/react-checkbox';

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <div className="w-full max-w-md mx-auto p-8">
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Register an account</h1>
                    <p className="text-gray-800 dark:text-white">
                        Start your journey with one click, explore the beautiful world!{' '}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-800 dark:text-white">Looking for?</label>
                        <div className="flex items-center space-x-4">
                            <Card className={`w-full p-4 ${selectedRole === 'user' ? 'border-blue-500 bg-blue-50' : 'border-gray-400'}`}>
                                <label className="flex items-center text-gray-800 dark:text-white cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="user"
                                        className="h-4 w-4 border-gray-400 text-gray-700 dark:text-white"
                                        onChange={() => setSelectedRole('user')}
                                        required
                                    />
                                    <span className="ml-2 flex gap-2 items-center">
                                        <User size={20} />
                                        User
                                    </span>
                                </label>
                            </Card>
                            <Card className={`w-full p-4 ${selectedRole === 'admin' ? 'border-blue-400 bg-blue-50' : 'border-gray-400'}`}>
                                <label className="flex items-center text-gray-800 dark:text-white cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="admin"
                                        className="h-4 w-4 border-gray-400 text-gray-700 dark:text-white"
                                        onChange={() => setSelectedRole('admin')}
                                        required
                                    />
                                    <span className="ml-2 flex gap-2 items-center">
                                        <Users size={20} />
                                        Admin
                                    </span>
                                </label>
                            </Card>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-800 dark:text-white">Email Address</label>
                        <Input
                            type="email"
                            placeholder="e.g. jhondoe@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 border-gray-400 text-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-800 dark:text-white">Full Name</label>
                        <Input
                            type="name"
                            placeholder="e.g Jhon Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-12 border-gray-400 text-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2 space-y-2">
                            <label className="text-sm font-medium text-gray-800 dark:text-white">Password</label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
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
                        <div className="w-1/2 space-y-2">
                            <label className="text-sm font-medium text-gray-800 dark:text-white">Confirm Password</label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-800 dark:text-white">Phone Number</label>
                        <Input
                            type="number"
                            placeholder="e.g 08111xxx"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="h-12 border-gray-400 text-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full rounded-full h-12 text-white bg-orange-500 hover:bg-orange-500/90"
                    >
                        Register
                    </Button>
                    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Privacy Policy</a>.
                    </div>
                </form>
            </div>
        </div>
    );
}