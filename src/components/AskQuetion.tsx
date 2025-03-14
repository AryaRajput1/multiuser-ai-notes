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
import MarkDown from 'react-markdown'
import * as Y from "yjs";
import { Input } from "@/components/ui/input"
import { FormEvent, useState, useTransition } from "react"
import { toast } from "sonner"
import { BotIcon, MessageCircleCode } from "lucide-react"

function AskQuestion({ doc }: { doc: Y.Doc }) {
    const [open, setIsOpen] = useState(false)
    const [question, setQuestion] = useState('')
    const [summary, setSummary] = useState('')
    const [isPending, startTransition] = useTransition()

    const onAskQuestion = (e: FormEvent) => {
        e.preventDefault()

        startTransition(async () => {
            const document = doc.get('document-store').toJSON()
            try {

                const res = await fetch(`${process.env.NEXT_PUBLIC_AI_URL}/api/chatToDocument`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        question: question,
                        doc: document
                    })
                })

                const { message } = await res.json()

                if (res.ok) {
                    setSummary(message)
                    toast.success('Note Translated Successfully.')
                } else {
                    setSummary('')
                }
            } catch (error) {
                console.log(error)

                setSummary('Something went wrong!')
            }
        })
    }
    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <Button asChild variant="outline">
                <DialogTrigger>
                    <MessageCircleCode />
                    Chat To Document
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chat To Docuement</DialogTitle>
                    <DialogDescription>
                        Ask question to chat docuemnt
                    </DialogDescription>
                    <hr className="mt-5" />
                    {
                        question && <p className="mt-5 text-gray-500">Question: {question}</p>
                    }

                </DialogHeader>
                {
                    summary && (
                        <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
                            <div className="flex">
                                <BotIcon className="w-10 flex-shrink-0" />
                                <p className="font-bol">
                                    GPT {isPending ? "is thinking..." : "Says:"}
                                </p>
                            </div>
                            <p>{isPending ? "Thinking..." : <MarkDown>{summary}</MarkDown>}</p>
                        </div>
                    )
                }
                <form onSubmit={onAskQuestion} className="flex gap-2">
                    <Input
                        type="text"
                        value={question}
                        placeholder="what is this about?"
                        className="w-full"
                        onChange={e => setQuestion(e.target.value)}
                    />
                    <Button className="" type="submit" disabled={isPending || !question}>{isPending ? 'Asking...' : "Ask"}</Button>
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
export default AskQuestion