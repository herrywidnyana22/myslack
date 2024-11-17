import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"


interface UseGetMemberProps{
    roomID: Id<"rooms">
}

export const useGetMembers = ({roomID}: UseGetMemberProps) =>{
    const data = useQuery(api.members.get, {roomID})

    const isLoading = data === undefined
    
    return { data, isLoading}
}