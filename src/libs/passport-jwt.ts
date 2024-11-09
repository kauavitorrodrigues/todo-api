import { ExtractJwt, Strategy as JWTStrategy} from 'passport-jwt'
import { getUserById } from '../services/user'

const options = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.JWT_SECRET as string
}

export const jwtStrategy = new JWTStrategy(options, async (payload, done) => {

    const { id } = payload
    const user = await getUserById(id)

    if (user) { 
        done(null, user) 
    } else {
        return done(null, false)
    }

})