'use client'

import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/auth/components/user-button";
import { useGetRooms } from "@/features/rooms/api/use-get-rooms";
import { useCreateRoomModal } from "@/features/rooms/store/use-create-room-modal";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Home() {

  const [openModal, setOpenModal] = useCreateRoomModal()
  const { data, isLoading } = useGetRooms()
  
  const router = useRouter()

  const roomID = useMemo(() => data?.[0]?._id, [data])

  useEffect(() =>{
    if(isLoading) return

    if(roomID){
      router.replace(`/room/${roomID}`)
    } else if(!openModal){
      setOpenModal(true)
    }
  }, [roomID, isLoading, openModal, setOpenModal, router])
  
  return (
    <div>
      <UserButton/>
    </div>
  );
}
