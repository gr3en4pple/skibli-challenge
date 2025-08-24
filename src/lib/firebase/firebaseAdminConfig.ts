import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const initializeFirebaseAdmin = () => {
  try {
    if (!getApps().length) {
      const firebaseAdminConfig = {
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(
            /\\n/g,
            "\n",
          ),
        }),
      };

      const app = initializeApp(firebaseAdminConfig);
      return app;
    }
    return getApps()[0];
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error);
    if (getApps().length) {
      return getApps()[0];
    }
    throw error;
  }
};

const app = initializeFirebaseAdmin();
const adminAuth = getAuth(app);
const adminDb = getFirestore(app);

const CollectionNames = {
  users: "users",
  otp_verifications: "otp_verifications",
};

export { adminAuth, adminDb, CollectionNames };
