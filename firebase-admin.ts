import { App, cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore"

var serviceKey = require("./service_key.json");

let app:App;

if( getApps().length === 0 ) {
    app = initializeApp({
        credential: cert(serviceKey)
    });
} else {
    app = getApp()
}

const adminDb = getFirestore(app)

export { app as adminApp, adminDb }