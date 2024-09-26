import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useCallback, useMemo, useState } from "react"
import { Id } from "../../../../convex/_generated/dataModel"


type ResType = Id<"rooms"> | null
type ReqType = { name: string }


type Options = {
    onSuccess?: (data: ResType) => void
    onError?: (error: Error) => void
    onDone?: () => void
    throwError?: boolean
}

export const useCreateRoom =() =>{

    const [data, setData] = useState<ResType>(null)
    const [error, setError] = useState<Error | null>(null)
    const [status, setStatus] = useState<"success" | "error" | "done" | "pending" | null>(null)

    const isPending = useMemo(() => status === "pending", [status])
    const isSuccess = useMemo(() => status === "success", [status])
    const isError = useMemo(() => status === "error", [status])
    const isDone = useMemo(() => status === "done", [status])

    const mutation = useMutation(api.rooms.create)

    const mutate = useCallback(async (values: ReqType, options?: Options) => {
        try {
            setStatus("pending")

            setData(null)
            setError(null)

            const response = await mutation(values)
            options?.onSuccess?.(response)

            return response
        } catch (error) {
            setStatus("error")
            options?.onError?.(error as Error)

            if(options?.throwError){
                throw error
            }
        } finally {
            setStatus("done")
            options?.onDone?.()
        }

    },[mutation])

    return {
        mutate,
        data,
        error,
        isError,
        isSuccess,
        isPending,
        isDone
    }
}