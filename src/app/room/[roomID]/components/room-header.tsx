import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { ChevronDown, ListFilter, SquarePen, UserPlus } from "lucide-react";
import { Info } from "@/components/info";
import { PreferenceModal } from "./preference-modal";
import { useState } from "react";
import { GearIcon } from "@radix-ui/react-icons";

type RoomHeaderProps = {
    room: Doc<"rooms">
    isAdmin: boolean
}
export const RoomHeader = ({room, isAdmin}: RoomHeaderProps) => {
    const [prefOpen, setPrefOpen] = useState(false)
    return ( 
        <>
            <PreferenceModal
                isOpen={prefOpen}
                setIsOpen={setPrefOpen}
                title={room.name}
            />
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
                        {
                            isAdmin && 
                            <>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem
                                    onClick={() =>{}}
                                    className="
                                        py-2
                                        cursor-pointer
                                    "
                                >
                                    <div className="flex gap-2 items-center">
                                        <UserPlus className="size-4"/>
                                        <p>Invite friend to { room.name }</p>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setPrefOpen(true)}
                                    className="
                                        py-2
                                        cursor-pointer
                                    "
                                >
                                    <div className="flex gap-2 items-center">
                                        <GearIcon className="size-4"/>
                                        <p>Preferences</p>
                                    </div>
                                    
                                </DropdownMenuItem>
                            
                            </>
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
                <div
                    className="
                        flex
                        gap-0.5
                        items-center
                    "
                >
                    <Info 
                        label="New chat"
                        side="bottom"
                    >
                        <Button
                            size="iconSm"
                            variant={"transparent"}
                        >
                            <SquarePen className="size-4"/>
                        </Button> 

                    </Info>
                    <Info
                        label="Filter chat" 
                        side="bottom"
                    >
                        <Button
                            size="iconSm"
                            variant={"transparent"}
                        >
                            <ListFilter className="size-4"/>
                        </Button> 
                    </Info>
                </div>
            </div>
        </>
    );
}