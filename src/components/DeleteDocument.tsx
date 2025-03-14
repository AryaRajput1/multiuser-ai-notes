'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogClose } from "@radix-ui/react-dialog"
import { deleteDoc, doc } from "firebase/firestore"
import { usePathname, useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { db } from "../../firebase"
import { deleteDocument } from "@/actions"
import { toast } from "sonner"

function DeleteDocument() {
    const [open, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const pathname = usePathname()
    const router = useRouter()


    const handleDelete = () => {
        const roomId = pathname.split('/').pop()
        if(!roomId){
            return;
        }
        startTransition(async () => {
            const { success } = await deleteDocument(roomId)

            if(success){
                setIsOpen(false)
                router.replace('/')
                toast.success("Document Successfull Deleted.")
            }else {
                toast.error("Document Deletion Failed.")
            }
        })
    }
    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <Button asChild variant="destructive">
            <DialogTrigger>Delete</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to Delete?</DialogTitle>
                    <DialogDescription>
                        This will delete the document and all its contents, removing all users from the document.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end gap-2">
                    <Button 
                    type="button"
                    variant='destructive'
                    onClick={handleDelete}
                    disabled={isPending}>
                        { isPending ? 'Deleting...': 'Delete'}
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default DeleteDocument