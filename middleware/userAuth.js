import jwt from "jsonwebtoken";


import "dotenv/config"

function authenticateUser(req, res, next) {
  // const token = req.cookies.token;
  const token = req.headers.authorization;
  console.log(token);
 

  jwt.verify(token, process.env.SK, (err, user) => {
 
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.sendStatus(403);
    }

    req.user = user;
   
   

    next();
  });
}

export default authenticateUser;