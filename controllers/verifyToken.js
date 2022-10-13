import connection from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res
      .status(401)
      .send({ success: false, message: "You are not authenticated!" });
  } else {
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        return res
          .status(403)
          .send({ success: false, message: "Token is not valid!" });
      }
      req.user = user;
      next();
    });
  }
};
