import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { adminDb } from "../../../../firebase-admin";
import { liveblocks } from "@/lib/liveblocks";


export async function POST(req: NextRequest) {
    auth.protect()
    const { sessionClaims } = await auth()
    const { room } = await req.json()

    if(!sessionClaims || !sessionClaims.email){
        return 
    }

    const session = liveblocks.prepareSession(
        sessionClaims?.email, {
            userInfo: { name: sessionClaims?.fullName, email: sessionClaims?.email, avatar: sessionClaims?.image }} // Optional
      );

    const roomsDocs = await adminDb.collectionGroup('rooms').where('roomId', '==', room).get()

    // @ts-expect-error error
    const isUserExists = roomsDocs.docs.find((doc) => doc.userId === sessionClaims?.emaill)

    if(!isUserExists){
        // @ts-expect-error error
        return new Response({ message: 'User Doesn`t exists'}, { status: 403 });
    }

    session.allow(room, session.FULL_ACCESS);

    // Authorize the user and return the result
    const { status, body } = await session.authorize();
    return new Response(body, { status });
}