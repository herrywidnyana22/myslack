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
import { CustomButton } from "@/components/custom-button";

export const LoginCard = ({setLoginState}: LoginProps) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const [isPending, setIsPending] = useState(false)
    
    const { signIn } = useAuthActions()

    const onLoginForm = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setIsPending(true)
        signIn("password", {
            email,
            password,
            flow: "signIn"
        }) 
        .catch(() =>{
            setError("Invalid email or password!")
        })
        .finally(() =>{
            setIsPending(false)
        })
    }

    const onLoginProvider = (provider: "google" | "github") =>{
        setIsPending(true)
        signIn(provider)
        .finally(() => {
            setIsPending(false)
        })
    }

    return ( 
        <Card 
            className="
                w-full 
                h-full 
                p-8
            "
        >
            <div 
                className="
                    flex 
                    items-center 
                    px-0 
                    pt-0 
                    gap-4 
                    mb-5
                "
            >
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
                        Login to continue with us
                    </CardTitle>
                    <CardDescription>
                        Use your email to continue
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
            <CardContent 
                className="
                    space-y-5 
                    px-0 
                    pb-0
                "
            >
                <form 
                    onSubmit={onLoginForm} 
                    className="space-y-2.5"
                >
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
                    <CustomButton
                        type="submit"
                        disabled={isPending}
                        className="w-full"
                    >
                        Continue
                    </CustomButton>
                </form>
                <div 
                    className="
                        relative 
                        w-full 
                        flex 
                        gap-3 
                        items-center 
                        justify-center 
                        text-muted-foreground
                    "
                >
                    <span 
                        className="
                            w-[43%] 
                            ring-[0.5px] 
                            ring-muted-foreground
                        "
                    />
                    <p>Or</p>
                    <span 
                        className="
                            w-[43%] 
                            ring-[0.5px] 
                            ring-muted-foreground
                        "
                    />
                </div>
                
                <div 
                    className="
                        flex 
                        flex-col 
                        gap-y-2.5
                    "
                >
                    <Button
                        onClick={() =>onLoginProvider('google')}
                        disabled={isPending}
                        variant={"outline"}
                        size={"lg"}
                        className="
                            w-full 
                            relative
                        "
                    >
                        <FcGoogle 
                            className="
                                absolute 
                                size-5 
                                top-2.5 
                                left-2.5
                            "
                        />
                        Continue with Google
                    </Button>
                    <Button
                        onClick={() =>onLoginProvider('github')}
                        disabled={isPending}
                        variant={"outline"}
                        size={"lg"}
                        className="
                            w-full 
                            relative
                        "
                    >
                        <FaGithub 
                            className="
                                absolute 
                                size-5 
                                top-2.5 
                                left-2.5
                            "
                        />
                        Continue with Github
                    </Button>
                </div>
                <p 
                    className="
                        text-xs 
                        text-muted-foreground
                    "
                >
                    Don&apos;t have an account? 
                    <span 
                        onClick={() => setLoginState("register")}
                        className="
                            ml-1
                            cursor-pointer 
                            hover:underline 
                            text-sky-700 
                        "
                    >
                        Register
                    </span>
                </p>
            </CardContent>
        </Card>
    );
}