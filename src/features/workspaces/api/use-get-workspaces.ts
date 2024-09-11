import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useGetWorkspaces = () =>{
    const workspacesData = useQuery(api.workspaces.get)
    const isLoading = workspacesData === undefined

    return { workspacesData, isLoading }
}