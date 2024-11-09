import { Strategy as LocalStrategy } from 'passport-local'
import { createJwtToken, getUserByEmailAndPassword } from '../services/user'

export type LocalStrategyResponse = {
    auth: {
        token: string
    },
    userId: number
}

export const localStrategy = new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password'

}, async (email, password, done) => {

    const user = await getUserByEmailAndPassword(email, password)

    if (user) {

        const token = createJwtToken(user.id)

        const response: LocalStrategyResponse = {
            auth: { token },
            userId: user.id
        }

        return done(null, response)

    } else {

        return done(null, false, { message: 'Invalid email or password' })

    }

})