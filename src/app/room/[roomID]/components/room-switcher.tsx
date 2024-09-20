import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGetRoom } from "@/features/rooms/api/use-get-room";
import { useGetRooms } from "@/features/rooms/api/use-get-rooms";
import { useCreateRoomModal } from "@/features/rooms/store/use-create-room-modal";
import { useRoomID } from "@/hooks/use-room-id";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
 
}
export const RoomSwitcher = ({}: Props) => {
    const [_openModal, setOpenModal] = useCreateRoomModal()

    const router = useRouter()
    const roomID = useRoomID()

    const { data: room, isLoading: roomLoading } = useGetRoom({id: roomID})
    const { data: rooms, isLoading: roomsLoading } = useGetRooms()

    const filteredRooms = rooms?.filter((room) => room?._id !== roomID)

    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    className="
                        size-8 
                        relative 
                        overflow-hidden 
                        text-xl 
                        bg-abu 
                        text-slate-800 
                        hover:bg-abu/80
                    "
                >
                {
                    roomLoading 
                    ? <Loader2 
                        className="
                            size-5 
                            animate-spin 
                            shrink-0
                        "
                      />
                    : room?.name.charAt(0).toUpperCase()
                }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                side="bottom" 
                align="start" 
                className="w-64"
            >
                <DropdownMenuItem
                    onClick={() => router.push(`/room/${roomID}`)} 
                    className="
                        flex-col 
                        items-start 
                        justify-start 
                        capitalize 
                        cursor-pointer
                    "
                >
                    {room?.name}
                    <span 
                        className="
                            text-xs 
                            text-muted-foreground
                        "
                    >
                        Active room
                    </span>
                </DropdownMenuItem>
                {
                    filteredRooms?.map((room) =>(
                        <DropdownMenuItem
                            key={room._id}
                            className="
                                capitalize 
                                cursor-pointer 
                                overflow-hidden
                            "
                            onClick={() => router.push(`/room/${room._id}`)}
                        >
                            <div 
                                className="
                                    shrink-0 
                                    size-9 
                                    relative 
                                    flex 
                                    items-center 
                                    justify-center 
                                    mr-2 
                                    overflow-hidden 
                                    text-lg 
                                    font-semibold 
                                    rounded-md 
                                    bg-abutua 
                                    text-white
                                "
                            >
                                { room?.name.charAt(0).toUpperCase() }
                            </div>
                            <p className="truncate">{ room?.name }</p>
                            
                        </DropdownMenuItem>

                    ))
                }
                <DropdownMenuItem
                    onClick={() => setOpenModal(true)}
                    className="cursor-pointer"
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
                            text-lg 
                            font-semibold 
                            rounded-md 
                            bg-[#f2f2f2] 
                            text-slate-800
                        "
                    >
                        <Plus/>
                    </div>
                    Create a new room
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}