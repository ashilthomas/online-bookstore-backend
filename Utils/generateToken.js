import jsonewebToken from "jsonwebtoken"
import "dotenv/config"

const secretKey = process.env.SK;

const generateToken = (email)=>{
    return jsonewebToken.sign({data:email},secretKey,{expiresIn:"1d"})
}

export default generateToken

