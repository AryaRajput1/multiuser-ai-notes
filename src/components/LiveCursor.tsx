import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import { Cursor } from "./Cursor";

export function LiveCursor({ children }: { children : React.ReactNode}) {
  const presence = useMyPresence();
  const updateMyPresence = presence[1]
  // Get list of other users
  const others = useOthers();

  // Update cursor coordinates on pointer move
function handlePointerMove(e: { clientX: number; clientY: number; }) {
    const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
    updateMyPresence({ cursor });
  }

  // Set cursor to null on pointer leave
function handlePointerLeave() {
    updateMyPresence({ cursor: null });
  }

  return <div onPointerMove={handlePointerMove}
  onPointerLeave={handlePointerLeave}>
  {others
      .filter((other) => other.presence.cursor !== null)
      .map(({ connectionId, presence, info }) => (
        <Cursor
          key={connectionId}
          info={ info }
          x={presence.cursor?.x || 0}
          y={presence.cursor?.y || 0}
        />
      ))}
      {children}
  </div>;
}