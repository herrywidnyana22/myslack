import { Button } from "@/components/ui/button";
import { useGetRoom } from "@/features/rooms/api/use-get-room";
import { useRoomID } from "@/hooks/use-room-id";
import { Info, Search } from "lucide-react";

type Props = {
 
}
export const Toolbar = ({}: Props) => {
    const roomID = useRoomID()
    const { data } = useGetRoom({id: roomID})


    return ( 
        <nav className="h-10 flex items-center justify-between p-1.5 bg-toolbar">
            <div className="flex-1"/>
            <div className="min-w-[280px] max-w-[640px] grow-[2] shrink">
                <Button size={"sm"} className="w-full h-7 bg-accent/25 justify-start px-2">
                    <Search className="size-4 text-white mr-2"/>
                    <span className="text-white text-xs">
                        Search {data?.name}
                    </span>
                </Button>
            </div>
            <div className="flex flex-1 items-center justify-end ml-auto">
                <Button variant={"transparent"} size={"iconSm"}>
                    <Info className="size-5 text-white"/>
                </Button>
            </div>
        </nav>
    );
}