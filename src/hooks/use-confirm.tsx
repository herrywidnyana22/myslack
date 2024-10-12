import { CustomButton } from "@/components/custom-button"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

type Props = {
 
}

export const useConfirm = (
    title: string,
    msg: string
): [() => JSX.Element, () => Promise<unknown>] => {

    const [promise, setPromise,] = useState<{ resolve: (value:boolean) => void  } | null>(null)

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({resolve})
    })

    const onClose = () =>{
        setPromise(null)
    }

    const onCancel = () =>{
        promise?.resolve(false)
        onClose()
    }

    const onConfirm = () =>{
        promise?.resolve(true)
        onClose()
    }

    const ConfirmDialog = () =>(
        <Dialog
            open={promise !== null}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        { title }
                    </DialogTitle>
                    <DialogDescription>
                        { msg }
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-2">
                    <Button
                        variant={"outline"}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <CustomButton
                        onClick={onConfirm}
                        disabled={false}
                    >
                        Confirm
                    </CustomButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

    return [ConfirmDialog, confirm]
}