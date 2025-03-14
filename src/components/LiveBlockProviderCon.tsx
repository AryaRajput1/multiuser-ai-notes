'use client'

import {
    ClientSideSuspense,
    LiveblocksProvider,
    RoomProvider,
  } from "@liveblocks/react/suspense";
function LiveBlockProviderCon({ children }: { children: React.ReactNode}) {
  return (
    <LiveblocksProvider authEndpoint={'/api/liveblock-auth'}>{children}</LiveblocksProvider>
  )
}
export default LiveBlockProviderCon