import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

type UseGetChanelsProps = {
 roomID: Id<"rooms">
}

export const useGetChanels = ({roomID}: UseGetChanelsProps) => {
    const data = useQuery(api.channels.get, {roomID})

    const isLoading = data === undefined

    return { data, isLoading }
}