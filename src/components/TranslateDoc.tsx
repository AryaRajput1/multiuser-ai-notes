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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import * as Y from "yjs";
import { FormEvent, useState, useTransition } from "react"
import { toast } from "sonner"
import { BotIcon, LanguagesIcon } from "lucide-react"

const languages = [
    "english",
    "spanish",
    "portuguese",
    "french",
    "german",
    "chinese",
    "arabic",
    "hindi",
    "russian",
    "japanese"
]

function TranslateDoc({doc}: { doc: Y.Doc}) {
    const [open, setIsOpen] = useState(false)
    const [summary, setSummary] = useState('')
    const [lang, setLang] = useState('')
    const [isPending, startTransition] = useTransition()

    const onTranslateDoc = (e: FormEvent) => {
        e.preventDefault()

        startTransition(async () => {
            const document = doc.get('document-store').toJSON()

            const res = await fetch(`${process.env.NEXT_PUBLIC_AI_URL}/api/translateDoc`, {
                method: 'POST',
                headers: {
                   "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    target_lang: lang,
                    doc: document
                })
            })

            const {translated_text} = await res.json()

            if (res.ok) {
                setSummary(translated_text)
                toast.success('Note Translated Successfully.')
            } else {
                setSummary('')
            }
        })
    }
    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <Button asChild variant="outline">
                <DialogTrigger>
                    <LanguagesIcon/>
                    Translate
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Translate Note</DialogTitle>
                    <DialogDescription>
                        Select the language to tranlate the Note.
                    </DialogDescription>
                </DialogHeader> 
                {
                    summary && (
                        <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
                            <div className="flex">
                                <BotIcon className="w-10 flex-shrink-0"/>
                                <p className="font-bol">
                                    GPT { isPending ? "is thinking...": "Says:"}
                                </p>
                            </div>
                            <p>{isPending ? "Thinking..." : <MarkDown>{summary}</MarkDown>}</p>
                        </div>
                    )
                }
                <form onSubmit={onTranslateDoc} className="flex flex-col gap-2">
                    <Select value={lang} onValueChange={val => setLang(val)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                languages.map(lang => (
                                    <SelectItem key={lang} value={lang}>{lang.toUpperCase()}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <Button className="" type="submit" disabled={isPending || !lang}>{isPending ? 'Translating...' : "Translate"}</Button>
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
export default TranslateDoc