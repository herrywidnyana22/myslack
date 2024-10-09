import { CustomInput } from "@/components/custom-input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDeleteRoom } from "@/features/rooms/api/use-delete-room"
import { useUpdateRoom } from "@/features/rooms/api/use-update-room"
import { useRoomID } from "@/hooks/use-room-id"
import { cn } from "@/lib/utils"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type PreferenceModalProps = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    title: string
}

export const PreferenceModal = ({isOpen, setIsOpen, title}: PreferenceModalProps) => {
    const [initTitle, setInitTitle] = useState(title)

    const [isEditMode, setIsEditMode] = useState(false)

    const { mutate: updateRoom, isPending: isPendingUpdate } = useUpdateRoom()
    const { mutate: deleteRoom, isPending: isPendingDelete } = useDeleteRoom()

    const roomID = useRoomID()

    const onEdit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        updateRoom({
            id: roomID,
            name: title
        },{
            onSuccess: () => toast.success("Room updated"),
            onError: () => toast.error("Failed to update room")
        })
    }

    const onCancel = () =>{
        setIsEditMode(!isEditMode)
        setInitTitle(title)
    }

    return ( 
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogContent
                className="
                    p-0
                    overflow-hidden
                    bg-gray-50
                "
            >
                <DialogHeader
                    className="
                        p-4
                        border-b
                        bg-white
                    "
                >
                    <DialogTitle>
                        { initTitle }
                    </DialogTitle>
                </DialogHeader>
                <div
                    className="
                        flex
                        flex-col
                        gap-y-2
                        px-4
                        pb-4
                    "
                >
                    <div 
                        className="
                            px-5
                            py-4
                            rounded-lg
                            border
                            cursor-pointer
                            bg-white
                            hover:bg-gray-50
                        "
                    >
                        <form
                            onSubmit={onEdit}
                            className="
                                relative
                                flex
                                gap-2
                                items-center
                                justify-between
                            "
                        >
                            
                            <CustomInput
                                required
                                name={"name"}
                                type="text"
                                value={initTitle}
                                label="Room name"
                                onChange={(e) => setInitTitle(e.target.value)}
                                disabled={isPendingUpdate}
                                readOnly={!isEditMode}
                                editMode
                            />
                            <p
                                onClick={onCancel}
                                className={cn(`
                                    text-sm
                                    font-semibold
                                    hover:underline`,
                                    isEditMode 
                                    ? "text-rose-500"
                                    : "text-[#1264a3]"
                                )}
                            >
                                {
                                    !isEditMode 
                                    ? "Edit"
                                    : "Cancel"
                                }
                            </p>
                        </form>
                    </div>
                    <button
                        disabled={false}
                        onClick={() =>{}}
                        className="
                            flex
                            items-center
                            gap-x-2
                            px-5
                            py-4
                            rounded-lg
                            border
                            cursor-pointer
                            text-rose-600
                            bg-white
                            hover:bg-gray-50
                        "
                    >
                        <Trash2 className="size-4"/>
                        <p  
                            className="
                                text-sm
                                font-semibold
                            "
                        >
                            Delete room
                        </p>
                    </button>
                </div>

            </DialogContent>
        </Dialog>
    );
}