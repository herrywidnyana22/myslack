import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"

interface UseGetRoomProps {
    id: Id<"rooms">
}

export const useGetRoom = ({id}: UseGetRoomProps) =>{
    const data = useQuery(api.rooms.getByID, { id })
    const isLoading = data === undefined

    return { data, isLoading }
}