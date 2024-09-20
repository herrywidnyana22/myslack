import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../api/use-current-user";
import { Loader2, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

type Props = {
 
}
export const UserButton = ({}: Props) => {
    const { currentUser, isLoading } = useCurrentUser()
    const { signOut } = useAuthActions()
    
    if(isLoading){
        return (
            <Loader2 className="size-4 animate-spin text-muted-foreground"/>
        )
    }

    if(!currentUser){
        return null
    }

    const { name, email, image } = currentUser

    const avatarName = name!.charAt(0).toUpperCase()
    

    return ( 
        <DropdownMenu 
            modal={false}
        >
            <DropdownMenuTrigger 
                className="
                    relative 
                    outline-none
                "
            >
                <Avatar 
                    className="
                        size-10 
                        transition 
                        hover:opacity-75
                    "
                >
                    <AvatarImage
                        alt="name"
                        src={image}
                    />
                    <AvatarFallback 
                        className="
                            text-white 
                            bg-sky-500
                        "
                    >
                        { avatarName }
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                align="center" 
                side="right" 
                className="w-60"
            >
                <DropdownMenuItem 
                    onClick={() => signOut()}>
                    <LogOut 
                        className="
                            size-4 
                            mr-2"
                    />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}