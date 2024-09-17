'use client'

import { useGetRoom } from "@/features/rooms/api/use-get-room"
import { useRoomID } from "@/hooks/use-room-id"

const RoomIdPage = () => {
    const roomID = useRoomID()
    const { data } = useGetRoom({id: roomID})

    return (
        <div>
            Data: {JSON.stringify(data)}
        </div>
    );
}
 
export default RoomIdPage;