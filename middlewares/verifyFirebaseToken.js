// middlewares/verifyFirebaseToken.js
import admin from "../firebaseAdmin.js";

const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify Firebase ID Token
    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded; // contains email, uid
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Unauthorized: Token invalid or expired" });
  }
};

export default verifyFirebaseToken;
