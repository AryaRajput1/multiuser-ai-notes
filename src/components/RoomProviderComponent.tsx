import {
    RoomProvider,
  } from "@liveblocks/react/suspense";
function RoomProviderComponent({ roomId , children }: { roomId: string,children: React.ReactNode}) {
  return (
    <RoomProvider id={roomId} initialPresence={
        {
            cursor: null
        }
    }>{children}</RoomProvider>
  )
}
export default RoomProvider