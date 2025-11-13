// firebaseAdmin.js
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

// ✅ Load Firebase credentials from environment variables
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
} = process.env;

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  console.error("❌ Firebase environment variables are missing!");
  process.exit(1);
}

// ✅ Important: Replace escaped newlines in private key
const privateKey = FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");

// ✅ Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey,
  }),
});

export default admin;
