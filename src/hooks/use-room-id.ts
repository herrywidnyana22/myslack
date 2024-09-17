import { useParams } from "next/navigation"
import { Id } from "../../convex/_generated/dataModel"

export const useRoomID = () =>{
    const params = useParams()

    return params.roomID as Id<"rooms">
}