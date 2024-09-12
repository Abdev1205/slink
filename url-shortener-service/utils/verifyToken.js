import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  // console.log("cookies value are : ", req.cookies)
  // console.log("tokens value are ", token)
  if (!token) {
    console.log("Helo no token found")
    return res.status(203).json({ message: "No Token Found", auth: false });
  }

  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(203).json({ message: "Invalid Token", auth: false });
    }
    // console.log("user id from jwt decode", decoded.id, decoded);
    req.id = decoded.id;
    next();
  });
};


export default verifyToken;

