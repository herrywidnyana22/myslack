import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useCurrentUser = () =>{
    const currentUser = useQuery(api.users.currentUserID)
    const isLoading = currentUser === undefined
}