'use client';
import LoginForm from "@/components/form/formLogin";
import HeroLoginSection from "@/components/hero/heroLogin";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-slate-800 overflow-hidden">
      <div className="hidden md:flex flex-1 ml-4 mt-4 mb-4 rounded-xl overflow-hidden bg-[url('https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2992&q=80')] bg-cover bg-center">
        <HeroLoginSection />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
