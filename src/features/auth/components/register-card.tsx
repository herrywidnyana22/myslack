import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { LoginProps } from "../types";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Alert } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import Image from "next/image"
import { CustomButton } from "@/components/ui/custom-button";

export const RegisterCard = ({setLoginState}: LoginProps) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [error, setError] = useState("")
    const [isPending, setIsPending] = useState(false)
    
    const { signIn } = useAuthActions()

    const onRegisterForm = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        
        if(password !== confirmPassword){
            setError("Password not match")
            return
        }
        setIsPending(true)
        signIn("password", {
            name,
            email,
            password,
            flow: "signUp"
        }) 
        .catch(() =>{
            setError("Something went wrong!")
        })
        .finally(() =>{
            setIsPending(false)
        })
    }

    const onRegisterProvider = (provider: "google" | "github") =>{
        setIsPending(true)
        signIn(provider)
        .finally(() => {
            setIsPending(false)
        })
    }
    return ( 
        <Card className="w-full h-full p-8">
            <div className="px-0 pt-0 flex gap-4 items-center mb-5">
                <div>
                    <Image
                        src={'/logo.png'}
                        alt="logo"
                        height={"45"}
                        width={"45"}
                    />
                </div>
                <div className="space-y-1">
                    <CardTitle>
                        Register to continue with us
                    </CardTitle>
                    <CardDescription>
                        Use your email to register & continue
                    </CardDescription>
                </div>
            </div>
            {
                !!error &&
                <Alert
                    type="error"
                    msg={error}
                />
            }
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onRegisterForm} className="space-y-2.5">
                    <Input
                        disabled={isPending}
                        value={name}
                        placeholder="Full name"
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        disabled={isPending}
                        value={email}
                        placeholder="Email"
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        disabled={isPending}
                        value={password}
                        placeholder="Password"
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        disabled={isPending}
                        value={confirmPassword}
                        placeholder="Confirm password"
                        type="password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <CustomButton
                        type="submit"
                        size={"lg"}
                        disabled={isPending}
                        className="w-full"
                    >
                        Register
                    </CustomButton>
                </form>
                
                <div className="relative w-full flex gap-3 items-center justify-center text-muted-foreground">
                    <span className="w-[43%] ring-[0.5px] ring-muted-foreground"/>
                    <p>Or</p>
                    <span className="w-[43%] ring-[0.5px] ring-muted-foreground"/>
                </div>
                
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        onClick={() =>onRegisterProvider("google")}
                        disabled={isPending}
                        variant={"outline"}
                        size={"lg"}
                        className="w-full relative"
                    >
                        <FcGoogle className="absolute size-5 top-2.5 left-2.5"/>
                        Register with Google
                    </Button>
                    <Button
                        onClick={() =>onRegisterProvider("github")}
                        disabled={isPending}
                        variant={"outline"}
                        size={"lg"}
                        className="w-full relative"
                    >
                        <FaGithub className="absolute size-5 top-2.5 left-2.5"/>
                        Register with Github
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Already have an account? 
                    <span 
                        onClick={() => setLoginState("login")}
                        className="text-sky-700 hover:underline cursor-pointer ml-1"
                    >
                        login
                    </span>
                </p>
            </CardContent>
        </Card>
    );
}