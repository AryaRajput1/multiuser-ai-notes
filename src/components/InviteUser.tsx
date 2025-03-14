'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"
import { useState, useTransition } from "react"
import { inviteUser } from "@/actions"
import { toast } from "sonner"

function InviteUser() {
    const [open, setIsOpen] = useState(false)
    const [email, setEmail] = useState('')
    const transition = useTransition()
    const startTransition = transition[1]
    const pathname = usePathname()

    const onInviteUser = () => {
        const roomId = pathname.split('/').pop()
        if (!roomId || !email) {
            return;
        }
        startTransition(async () => {
            const { success } = await inviteUser(roomId, email)

            if (success) {
                setIsOpen(false)
                toast.success("User Invited Successfully.")
            } else {
                toast.error("Invitation Failed.")
            }
        })
    }
    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <Button asChild variant="outline">
                <DialogTrigger>Invite</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite a user to collaborate:</DialogTitle>
                    <DialogDescription>
                        Enter the email of the user you want to invite
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onInviteUser}>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button>Invite</Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default InviteUser