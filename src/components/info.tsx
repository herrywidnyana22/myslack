'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

type InfoProps={
    children: React.ReactNode
    label: string
    side?: "top" | "bottom" | "right" | "left"
    align?: "start" | "center" | "end"
}

export const Info = ({
    children,
    label,
    side,
    align,
}: InfoProps) => {
    return ( 
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    side={side}
                    align={align}
                    className="
                        border
                        border-white/5
                        text-white
                        bg-black
                    "
                >
                    <p
                        className="
                            text-xs
                            font-medium
                        "
                    >
                        { label }

                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}