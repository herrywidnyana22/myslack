import { useCurrentMember } from "@/features/members/use-current-member";
import { useGetRoom } from "@/features/rooms/api/use-get-room";
import { useRoomID } from "@/hooks/use-room-id";
import { AlertTriangle, Loader2 } from "lucide-react";
import { RoomHeader } from "./room-header";

type Props = {
 
}
export const RoomSidebar = ({}: Props) => {
    const roomID = useRoomID()

    const {data: member, isLoading: memberLoading} = useCurrentMember({roomID})
    const {data: room, isLoading: roomLoading} = useGetRoom({id: roomID})

    if(memberLoading || roomLoading){
        return(
            <div 
                className="
                    h-full 
                    flex 
                    flex-col 
                    items-center 
                    justify-center 
                    bg-channel
                "
            >
                <Loader2 
                    className="
                        size-5 
                        animate-spin 
                        text-white
                    "
                />
            </div>
        )
    }

    if(!room || !member){
        return(
            <div 
                className="
                    h-full 
                    flex 
                    flex-col 
                    gap-y-2 
                    items-center 
                    justify-center 
                    bg-channel
                "
            >
                <AlertTriangle 
                    className="
                        size-5 
                        text-white
                    "
                />
                <p 
                    className="
                        text-sm 
                        text-white
                    "
                >
                    Room not found!
                </p>
            </div>
        )
    }

    return ( 
        <div 
            className="
                h-full 
                flex 
                flex-col 
                bg-channel
            "
        >
            <RoomHeader room={room}/>
        </div>
    );
}