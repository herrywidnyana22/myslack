import { useCurrentMember } from "@/features/members/use-current-member";
import { useGetRoom } from "@/features/rooms/api/use-get-room";
import { useRoomID } from "@/hooks/use-room-id";
import { AlertTriangle, HashIcon, Loader2, MessageSquareText, Send, SendHorizonal } from "lucide-react";
import { RoomHeader } from "./room-header";
import { RoomMenuItem } from "./room-menu-item";
import { useGetChanels } from "@/features/auth/api/use-get-channels";
import { RoomSection } from "../room-section";

type Props = {
 
}

export const RoomSidebar = ({}: Props) => {
    const roomID = useRoomID()

    const {data: member, isLoading: memberLoading} = useCurrentMember({roomID})
    const {data: room, isLoading: roomLoading} = useGetRoom({id: roomID})
    const {data: channels, isLoading: channelsLoading} = useGetChanels({roomID})

    console.log({channels})

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
            <RoomHeader 
                room={ room }
                isAdmin={ member.role === "admin"}
            />

            <div
                className="
                    flex
                    flex-col
                    px-2
                    mt-3
                    
                "
            >
                <RoomMenuItem
                    label="Threads"
                    icon={MessageSquareText}
                    id="Threads"
                />
                <RoomMenuItem
                    label="Drafts & Sent"
                    icon={SendHorizonal}
                    id="DraftsSent"
                />
            </div>
            <RoomSection
                label="Channels"
                info="Add new channel"
                onAdd={() => {}}
            >
            {
                channels?.map((item) =>(
                    <RoomMenuItem
                        key={item._id}
                        id={item._id}
                        label={item.name}
                        icon={HashIcon}
                    />
                ))
            }
            </RoomSection>
            
        </div>
    );
}