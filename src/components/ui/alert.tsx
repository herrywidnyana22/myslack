import { cn } from "@/lib/utils";
import { CheckCircle, TriangleAlert } from "lucide-react";

type AlertProps = {
    type: "error" | "success"
    msg: string
}

export const Alert = ({
    type,
    msg
}: AlertProps) => {
    return ( 
        <div 
            className={
                cn("flex items-center gap-x-2 text-sm mb-6  p-3 rounded-md",
                    type === "error" ? "bg-destructive/15 text-destructive" : "bg-green-400/15 text-green-600"

        )}>
            {
                type === "error" && <TriangleAlert className="size-4"/>
            }
            {
                type === "success" && <CheckCircle className="size-4"/>
            }
            <p>{msg}</p>
        </div>
    );
}