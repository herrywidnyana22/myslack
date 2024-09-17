import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Id } from "../../../convex/_generated/dataModel"

interface UseCurrentMemberProps{
    roomID: Id<"rooms">
}

export const useCurrentMember = ({roomID}: UseCurrentMemberProps) =>{
    const data = useQuery(api.members.current, {roomID})

    const isLoading = data === undefined
    
    return { data, isLoading}
}