import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { LoginProps } from "../types";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

export const LoginCard = ({setLoginState}: LoginProps) => {

    const { signIn } = useAuthActions()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const onProviderLogin = (provider: "google" | "github") =>{
        signIn(provider)
    }

    return ( 
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 -pt-0">
                <CardTitle>
                    Login to continue
                </CardTitle>
                <CardDescription>
                    Use your email to continue
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5">
                    <Input
                        disabled={false}
                        value={email}
                        placeholder="Email"
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        disabled={false}
                        value={password}
                        placeholder="Password"
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        size={"lg"}
                        disabled={false}
                        className="w-full"
                    >
                        Continue
                    </Button>
                </form>
                <div className="relative w-full flex gap-3 items-center justify-center text-muted-foreground">
                    <span className="w-[43%] ring-[0.5px] ring-muted-foreground"/>
                    <p>Or</p>
                    <span className="w-[43%] ring-[0.5px] ring-muted-foreground"/>

                </div>
                
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        onClick={() =>onProviderLogin('google')}
                        disabled={false}
                        variant={"outline"}
                        size={"lg"}
                        className="w-full relative"
                    >
                        <FcGoogle className="absolute size-5 top-2.5 left-2.5"/>
                        Continue with Google
                    </Button>
                    <Button
                        onClick={() =>onProviderLogin('github')}
                        disabled={false}
                        variant={"outline"}
                        size={"lg"}
                        className="w-full relative"
                    >
                        <FaGithub className="absolute size-5 top-2.5 left-2.5"/>
                        Continue with Github
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account? 
                    <span 
                        onClick={() => setLoginState("register")}
                        className="text-sky-700 hover:underline cursor-pointer ml-1"
                    >
                        Register
                    </span>
                </p>
            </CardContent>
        </Card>
    );
}