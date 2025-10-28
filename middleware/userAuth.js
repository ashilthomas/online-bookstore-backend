import jwt from "jsonwebtoken";
import "dotenv/config";

function authenticateUser(req, res, next) {
  // Prefer Authorization header with Bearer scheme; fall back to cookie
  let token = null;

  const authHeader = req.headers.authorization;
  if (authHeader && typeof authHeader === "string") {
    const parts = authHeader.split(" ");
    if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
      token = parts[1];
    } else {
      // In case the header contains only the token without Bearer
      token = authHeader.trim();
    }
  }

  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  jwt.verify(token, process.env.SK, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
}

export default authenticateUser;