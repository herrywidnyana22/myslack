import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetRoom } from "@/features/rooms/api/use-get-room";
import { useRoomID } from "@/hooks/use-room-id";

import { useGetChanels } from "@/features/channels/api/use-get-channels";
import { useGetMembers } from "@/features/members/api/use-get-member";

import { RoomHeader } from "./room-header";
import { RoomItem } from "./room-item";
import { RoomSection } from "../room-section";

import { AlertTriangle, HashIcon, Loader2, MessageSquareText, Send, SendHorizonal } from "lucide-react";
import { MemberItem } from "./member-item";


export const RoomSidebar = () => {
    const roomID = useRoomID()

    const {data: member, isLoading: memberLoading} = useCurrentMember({roomID})
    const {data: room, isLoading: roomLoading} = useGetRoom({id: roomID})
    const {data: channels, isLoading: channelsLoading} = useGetChanels({roomID})
    const {data: members, isLoading: membersLoading} = useGetMembers({roomID})

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
                    gap-1
                "
            >
                <RoomItem
                    label="Threads"
                    icon={MessageSquareText}
                    id="Threads"
                />
                <RoomItem
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
                    <RoomItem
                        key={item._id}
                        id={item._id}
                        label={item.name}
                        icon={HashIcon}
                    />
                ))
            }
            </RoomSection>
            <RoomSection
                label="Direct Chat"
                info="Add new channel"
                onAdd={() => {}}
            >
            {
                members?.map((item) =>(
                    <MemberItem 
                        key={item._id}
                        id={item._id}
                        label={item.user.name}
                        image={item.user.image}
                    />
                ))
            }

            </RoomSection>
        </div>
    );
}