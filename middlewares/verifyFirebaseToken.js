// middleware/verifyFirebaseToken.js
import admin from "../firebaseAdmin.js";

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email.split("@")[0],
    };
    next();
  } catch (error) {
    console.error("Firebase token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyFirebaseToken;