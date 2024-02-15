import jwt from "jsonwebtoken";
import { promisify } from "util";

const userAuth = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "You are not logged in" });

    if (token.exp < new Date())
      return res.status(401).json({ message: "Not Authenticated" });

    let decoded;
    try {
      decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_TOKEN_SECRET
      );
    } catch (error) {
      if (error.name === "JsonWebTokenError")
        return res.status(401).json("Invalid token");
      else if (error.name === "TokenExpiredError")
        return res
          .status(401)
          .json("Your session token has expired !! Login again");
    }

    req.userData = decoded;

    next();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export default userAuth;
