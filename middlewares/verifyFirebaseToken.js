// middlewares/verifyFirebaseToken.js
import admin from "../firebaseAdmin.js";

const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decodedValue = await admin.auth().verifyIdToken(token);

    if (!decodedValue) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = {
      email: decodedValue.email,
      name: decodedValue.name || "User",
      uid: decodedValue.uid,
    };

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Unauthorized: Token invalid or expired" });
  }
};

export default verifyFirebaseToken;
