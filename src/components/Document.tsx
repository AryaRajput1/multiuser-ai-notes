'use client'

import { FormEvent, useEffect, useState, useTransition } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Editor } from "./Editor";
import useOwner from "@/hooks/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";

function Document({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();
    const [title, setTitle] = useState("")
    const [data] = useDocumentData(doc(db, "documents", id))

    useEffect(()=> {
        if(!data) {
            return 
        }
        console.log(data)
        setTitle(data.title)
    }, [data])

    const editTitle = (e: FormEvent) => {
        e.preventDefault()

        if(data?.title === title) {
            return  
        }
        startTransition(async () => {
            await updateDoc(doc(db, 'documents', id), {
                title
            })
        })
    }

    const isOwner = useOwner()

  return (
    <div  className="flex-1 h-full bg-white p-5">
        <div className="flex max-w-6xl mx-auto justify-between pb-2">
            <form onSubmit={editTitle} className="flex flex-1 space-x-2">
                <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
                <Button onChange={editTitle}>{ isPending? 'Editing...': 'Edit'}</Button>
                {
                isOwner && (
                    <>
                    <InviteUser/>
                    <DeleteDocument/>
                    </>
                )
            }
            </form>
        </div>
        <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
            <ManageUsers/>
            <Avatars/>
        </div>
        <Editor/>
    </div>
  )
}
export default Document