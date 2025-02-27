import jwt from "jsonwebtoken";

// ✅ Middleware to verify token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

// ✅ If `authenticate` is required, define and export it
export const authenticate = (req, res, next) => {
  verifyToken(req, res, next); // Reuse the verifyToken function
};


export const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
      next(); // Proceed if user is admin
  } else {
      res.status(403).json({ message: "Access denied. Admins only." });
  }
};

