import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { ChevronDown } from "lucide-react";

type RoomHeaderProps = {
    room: Doc<"rooms">
}
export const RoomHeader = ({room}: RoomHeaderProps) => {
    return ( 
        <div 
            className="
                h-12 
                flex 
                items-center 
                justify-between 
                px-4 
                gap-0.5
            "
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={"transparent"}
                        size={"sm"}
                        className="
                            w-auto 
                            p-1.5 
                            font-semibold 
                            text-lg 
                            overflow-hidden
                        "
                    >
                        <span 
                            className="
                                truncate
                            "
                        >
                                { room.name }
                        </span>
                        <ChevronDown 
                            className="
                                size-4 
                                ml-1 
                                shrink-0
                            "
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="bottom"
                    align="start"
                    className="w-64"
                >
                    <DropdownMenuItem
                        className="
                            cursor-pointer
                            capitalize
                        "
                    >
                        <div
                            className="
                                size-9
                                relative
                                flex
                                items-center
                                justify-center
                                mr-2
                                overflow-hidden
                                font-semibold
                                text-xl
                                rounded-md
                                bg-[#606061]
                                text-white
                            "
                        >
                            {
                                room.name.charAt(0).toUpperCase()
                            }
                        </div>
                        <div 
                            className="
                                flex
                                flex-col
                                items-start
                            "
                        >
                            <p 
                                className="
                                    font-bold
                                "
                            >
                                {room.name}
                            </p>
                            <p 
                                className="
                                    text-xs
                                    text-muted-foreground
                                "
                            >
                                Active room
                            </p>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}