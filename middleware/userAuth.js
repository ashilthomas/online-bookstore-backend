import jwt from "jsonwebtoken";


import "dotenv/config"

function authenticateUser(req, res, next) {
  const token = req.cookies.token;
 

  jwt.verify(token, process.env.SK, (err, user) => {
 
    if (err) return res.sendStatus(403);

    req.user = user;
   
   

    next();
  });
}

export default authenticateUser;