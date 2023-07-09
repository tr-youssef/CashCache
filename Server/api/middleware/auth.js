import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  console.log("in auth");
  try {
    console.log("req.url", req.url);
    if (req.url.startsWith("/signin") || req.url.startsWith("/signup")) {
      next();
    }
    console.log("req.headers.authorization", req.headers?.authorization);
    const token = req.headers.authorization.split(" ")[1];
    console.log("Serverside token", token);
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    let userId = decodedData?.id;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: "Invalid token!",
    });
  }
};

export default auth;
