import jwt from 'jsonwebtoken';

// Extract the verify function from the jwt module
const { verify } = jwt;

const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {

    token = token.slice(7);
    verify(token, "mysecretkey", (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 0,
          message: "Invalid Token..."
        });
      } else {
        console.log(decoded)
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      status: 0,
      message: "Access Denied! Unauthorized User"
    });
  }
}
export default checkToken
