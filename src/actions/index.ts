'use server'

import { auth } from "@clerk/nextjs/server"
import { adminDb } from "../../firebase-admin"
import { liveblocks } from "@/lib/liveblocks"

export const createNewDocument = async () => {
    auth.protect()

    const { sessionClaims } = await auth()

    const docRef = await adminDb.collection('documents').add({
        title: 'New Document'
    })

    await adminDb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
        userId: sessionClaims?.email,
        createdAt: new Date(),
        role: 'owner', 
        roomId: docRef.id
    }) 


    return {
        id: docRef.id
    }
}

export const deleteDocument = async (roomId: string) => {
    auth.protect()

    try {
        await adminDb.collection('documents').doc(roomId).delete()

        const query = await adminDb.collectionGroup("rooms").where("roomId", "==", roomId).get()

        const batch = adminDb.batch();
        query.docs.forEach(doc => {
            batch.delete(doc.ref)
        })

        batch.commit()

        await liveblocks.deleteRoom(roomId)

        return {
            success: true
        }

    } catch(e) {
        console.log(e)
        return {
            success: false
        }
    }
}

export const inviteUser = async (roomId: string, email: string) => {
    auth.protect()

    try {
        await adminDb.collection('users').doc(email).collection("rooms").doc(roomId).set({
            createdAt: new Date(),
            roomId,
            userId: email,
            role: 'editor'
        })

        return {
            success: true
        }

    } catch(e) {
        console.log(e)
        return {
            success: false
        }
    }
}

export const removeUserFromDocument = async (roomId: string, userId: string) => {
    auth.protect()

    try {
        await adminDb.collection('users').doc(userId).collection('rooms').doc(roomId).delete()

        return { success: true }
        
    } catch (error) {
        return { success: false }
    }

}