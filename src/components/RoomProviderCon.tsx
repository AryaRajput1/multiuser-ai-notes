'use client'

import { LiveCursor } from "@/components/LiveCursor";
import Loader from "@/components/Loader";
import {
    RoomProvider,
    ClientSideSuspense
} from "@liveblocks/react/suspense";
function RoomProviderCon({ id, children }: { id: string , children: React.ReactNode }) {
    return (
        <RoomProvider id={id} initialPresence={
            {
                cursor: null
            }
        }>

            <ClientSideSuspense fallback={<Loader />}>
                <LiveCursor>
                    {children}
                </LiveCursor>
            </ClientSideSuspense></RoomProvider>
    )
}
export default RoomProviderCon