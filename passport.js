import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from "./models/userModel.js";
import "dotenv/config"

const secret_key = "accjlksfljklg"
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:   secret_key
  };
  passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      
        const user = await User.findOne({ email: jwtPayload.user });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }

}));


  export default passport