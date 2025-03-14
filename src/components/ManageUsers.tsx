'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { db } from "../../firebase"
import { inviteUser, removeUserFromDocument } from "@/actions"
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs"
import { useRoom } from "@liveblocks/react"
import { useCollection } from "react-firebase-hooks/firestore"
import { collectionGroup, query, where } from "firebase/firestore"
import useOwner from "@/hooks/useOwner"
import { XIcon } from "lucide-react"

function ManageUsers() {
    const { user } = useUser()
    const room = useRoom()
    const [open, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const { isOwner } = useOwner()

    const [usersInRoom] = useCollection(user && query(collectionGroup(db, 'rooms'), where('roomId', '==', room.id)))


    const handleDelete = (userId: string) => {
        startTransition( async () => {
            if (!user) {
                return
            }

            const { success } = await removeUserFromDocument(room.id, userId)
        })
    }
    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <Button asChild variant="outline">
                <DialogTrigger>Users({usersInRoom?.docs.length})</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Users with Access</DialogTitle>
                    <DialogDescription>
                        Below is a list of users who have access to this doucment.
                    </DialogDescription>
                </DialogHeader>
                <hr className="my-2" />
                <div className="flex flex-col space-y-2">
                    {
                        usersInRoom?.docs.map(doc => (
                            <div key={doc.data().userId}
                                className="flex items-center justify-between">
                                <p> {
                                    doc.data().userId === user?.emailAddresses[0].toString()
                                        ? `You (${doc.data().userId})`
                                        : doc.data().userId
                                }
                                </p>
                                <div className="flex items-center gap-2">
                                    <Button variant='outline'>{doc.data().role.toUpperCase()}</Button>
                                    {
                                        isOwner
                                        && doc.data().userId !== user?.emailAddresses[0].toString()
                                        && (
                                            <Button onClick={() => handleDelete(doc.data().userId)}>{isPending ? 'Removing...' : <XIcon />}</Button>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }

                </div>
            </DialogContent>
        </Dialog>
    )
}
export default ManageUsers