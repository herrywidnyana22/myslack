import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDeleteRoom } from "@/features/rooms/api/use-delete-room"
import { useUpdateRoom } from "@/features/rooms/api/use-update-room"
import { useConfirm } from "@/hooks/use-confirm"
import { useRoomID } from "@/hooks/use-room-id"
import { cn } from "@/lib/utils"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
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

    const [ConfirmDelete, confirm] = useConfirm(
        "Are you sure?",
        "This action can't undo"
    )


    const router = useRouter()

    const roomID = useRoomID()

    const onEdit = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        updateRoom({
            id: roomID,
            name: initTitle
        }, {
            onSuccess: () => {
                toast.success("Room updated")
                setIsEditMode(false)
            },
            onError: () => toast.error("Failed to update room")
        })
    }

    const onDelete = async() =>{
        const isOk = await confirm()
        if(!isOk) return

        deleteRoom({
            id: roomID
        }, {
             onSuccess: () => {
                toast.success("Room deleted")
                router.replace("/")
            },
            onError: () => toast.error("Failed to delete room")
        })
    }

    const onCancel = () =>{
        setIsEditMode(!isEditMode)
        setInitTitle(title)
    }

    return ( 
        <>
            <ConfirmDelete/>
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
                        { 
                            isEditMode 
                            ? `Rename "${title}"`
                            : initTitle 
                        }
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
                                <div 
                                    className="
                                        flex
                                        gap-1
                                        items-center
                                    "
                                >
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
                                    {
                                        isEditMode && 
                                        <CustomButton
                                            type="submit"
                                            variant="ghost"
                                            disabled={isPendingUpdate}
                                            className="p-1 px-3 text-green-600 hover:text-green-700"
                                        
                                        >
                                            Save
                                        </CustomButton>
                                    }
                                </div>
                            </form>
                        </div>
                        <CustomButton
                            disabled={isPendingDelete}
                            onClick={onDelete}
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
                                hover:bg-rose-100
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
                        </CustomButton>
                    </div>

                </DialogContent>
            </Dialog>
        
        </>
    );
}