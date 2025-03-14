'use client'
import { MenuIcon } from "lucide-react"
import NewDocumentButton from "./NewDocumentButton"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useCollection } from 'react-firebase-hooks/firestore';
import { useUser } from "@clerk/nextjs";
import { collectionGroup, DocumentData, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import SidebarOptions from "./SidebarOptions";

interface RoomDocument extends DocumentData {
    createdAt: Date,
    role: 'owner' | 'editor',
    userId: string,
    roomId: string
}

function Sidebar() {
    const [groupedData, setGroupedData] = useState({
        owner: [] as RoomDocument[],
        editor: [] as RoomDocument[],
    })
    const { user } = useUser()

    const [data, loading, error] = useCollection(user && query(collectionGroup(db, "rooms"), where("userId", "==", user.emailAddresses[0].toString())))

    useEffect(() => {
        if (!data) return
        const groupedNotes = data.docs.reduce<{
            owner: RoomDocument[],
            editor: RoomDocument[]
        }>(
            (acc, dataItem) => {

                const roomData = dataItem.data() as RoomDocument

                if (roomData.role === 'owner') {
                    acc.owner.push({
                        id: dataItem.id,
                        ...roomData,
                    })
                } else {
                    acc.editor.push({
                        id: dataItem.id,
                        ...roomData,
                    })
                }

                return acc
            }, { owner: [], editor: [] })
            console.log(groupedNotes)
        setGroupedData(groupedNotes)
    }, [data])

    const sidebarOptions = <>
        <NewDocumentButton />
        <div className="flex py-4 flex-col space-y-4 md:max-w-36">
            {
                groupedData.owner.length === 0 ? <>
                    <h2 className="text-gray-500 text-sm font-semibold">
                        No Documents Found.
                    </h2>
                </> : <>
                    <h2 className="text-gray-500 text-sm font-semibold">
                        My Documents
                    </h2>
                    {
                        groupedData.owner.map((doc, index) => (
                            <SidebarOptions key={index} id={doc.id} href={`/doc/${doc.id}`}/>
                        ))
                    }
                </>
            }
        </div>
        <div className="flex py-4 flex-col space-y-4 md:max-w-36">
            {
                groupedData.editor.length > 0 && <>
                    <h2 className="text-gray-500 text-sm font-semibold">
                        Shared With Me
                    </h2>
                    {
                        groupedData.editor.map((doc, index) => (
                            <SidebarOptions key={index} id={doc.id} href={`/doc/${doc.id}`}/>
                        ))
                    }
                </>
            }
        </div>
    </>
    return (
        <div className="p-2 bg-gray-200 md:p-5 relative">
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon className="p-1 hover:opacity-30 rounded-lg" />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <div>
                                {sidebarOptions}
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="hidden md:inline">
                {sidebarOptions}
            </div>
        </div>
    )
}

export default Sidebar