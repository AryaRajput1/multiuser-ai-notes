import { App, cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore"

const serviceKeyBase64 = process.env.FIREBASE_SERVICE_KEY;
if (!serviceKeyBase64) {
    throw new Error("Missing Firebase service key");
}

const serviceKey = JSON.parse(Buffer.from(serviceKeyBase64, "base64").toString("utf8"));

let app: App;

if (getApps().length === 0) {
    app = initializeApp({
        credential: cert(serviceKey)
    });
} else {
    app = getApp()
}

const adminDb = getFirestore(app)

export { app as adminApp, adminDb }