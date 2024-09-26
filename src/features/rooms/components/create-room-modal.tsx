
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateRoomModal } from "../store/use-create-room-modal";
import { Input } from "@/components/ui/input";
import { useCreateRoom } from "../api/use-create-room";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CustomButton } from "@/components/custom-button";

type Props = {
 
}
export const CreateRoomModal = ({}: Props) => {
    const [openModal, setOpenModal] = useCreateRoomModal()
    const [name, setName] = useState("")

    const { mutate, isPending } = useCreateRoom()

    const router = useRouter()

    const onCloseModal = () =>{
        setOpenModal(false)
        setName("")
    }

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        mutate({ name }, {
            onSuccess(id){
                router.push(`/room/${id}`)
                onCloseModal()
                toast.success("Room created...")
            },
        })
        
    }

    return ( 
        <Dialog
            open={openModal}
            onOpenChange={onCloseModal}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add a new room
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        value={name}
                        disabled={isPending}
                        required
                        autoFocus
                        minLength={3}
                        placeholder="Room name example: 'My Personal'"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="flex justify-end">
                        <CustomButton
                            disabled={isPending}
                            type="submit"
                        >
                            Create
                        </CustomButton>

                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}