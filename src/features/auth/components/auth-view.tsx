'use client'

import { useState } from "react";
import { LoginType } from "../types";
import { LoginCard } from "./login-card";
import { RegisterCard } from "./register-card";

type Props = {
 
}

export const AuthView = ({}: Props) => {
    const [loginState, setLoginState] = useState<LoginType>("login")
    return ( 
        <div className="h-full flex items-center justify-center bg-slack">
            <div className="md:h-auto md:w-[420px]">
            {
                loginState === "login"
                ? <LoginCard setLoginState={setLoginState}/>
                : <RegisterCard setLoginState={setLoginState}/>
            }
            </div>
        </div>
    );
}