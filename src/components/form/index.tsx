import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import LoginForm from "./formLogin"
import RegisterForm from "./formRegister"

export function AuthForm() {

    return (
        <Tabs defaultValue="login" className="w-full max-w-lg mx-auto p-8">
            <TabsList className="grid w-full max-w-lg h-fit grid-cols-2 p-2 bg-gray-50 dark:bg-slate-800 rounded-lg transition-all duration-500 ease-linear">
                <TabsTrigger
                    value="login"
                    className="text-center text-gray-800 p-2 dark:text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 rounded-lg">
                    Login
                </TabsTrigger>
                <TabsTrigger
                    value="register"
                    className="text-center text-gray-800 p-2 dark:text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 rounded-lg">
                    Register
                </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <LoginForm />
            </TabsContent>
            <TabsContent value="register">
                <RegisterForm />
            </TabsContent>
        </Tabs>
    )
}