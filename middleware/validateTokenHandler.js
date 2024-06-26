import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isUser = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    // console.log("Token:", token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error("Token Verification Error:", err);
        res.status(401).json({ success: false, message: "Unauthorized User" });
        throw new Error("Unauthorized User");
      }
      req.user = decoded.user;
      // console.log("Decoded User:", req.user);
      next();
    });
  } else {
    res
      .status(401)
      .json({
        success: false,
        message: "User is Unauthorized or Missing Token",
      });
    throw new Error("User is Unauthorized or Missing Token");
  }
});

export default isUser;
