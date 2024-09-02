import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { LoginProps } from "../types";
import { useState } from "react";


export const RegisterCard = ({setLoginState}: LoginProps) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    return ( 
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 -pt-0">
                <CardTitle>
                    Register to continue
                </CardTitle>
                <CardDescription>
                    Use your email to register and continue
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
                    <Input
                        disabled={false}
                        value={confirmPassword}
                        placeholder="Confirm password"
                        type="password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        size={"lg"}
                        disabled={false}
                        className="w-full"
                    >
                        Register
                    </Button>
                </form>
                
                <Separator/>
                
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        onClick={() =>{}}
                        disabled={false}
                        variant={"outline"}
                        size={"lg"}
                        className="w-full relative"
                    >
                        <FcGoogle className="absolute size-5 top-2.5 left-2.5"/>
                        Register with Google
                    </Button>
                    <Button
                        onClick={() =>{}}
                        disabled={false}
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