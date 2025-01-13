const jwt =  require('jsonwebtoken');

const JWT_SECRET = "Tushar";

function auth(req,res,next){
    const JWTtoken = req.headers.authorization;
    const userDecode = jwt.verify(JWTtoken, JWT_SECRET);

    if (userDecode) {
      req.userId = userDecode.id;
      next();
    } else {
      res.json({
        message: "The user is either not sign-up / sign-in",
      });
    }
}

module.exports = {
  auth: auth,
  JWT_SECRET: JWT_SECRET,
};