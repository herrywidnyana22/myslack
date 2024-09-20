import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Doc } from "../../../../../convex/_generated/dataModel";

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
                        <span>{ room.name }</span>
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>
        </div>
    );
}