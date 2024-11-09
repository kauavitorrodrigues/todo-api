import { NextFunction, Request, RequestHandler, Response } from "express";
import passport from "passport";
import { LocalStrategyResponse } from "../libs/passport-local";

export const auth = {

    local: async (req: Request, res: Response, next: NextFunction) => {

        const authRequest = passport.authenticate('local', 
            
            (err: any, response: LocalStrategyResponse | undefined) => {

                if(response) {
                    req.user = response.userId
                    req.authInfo = response.auth
                    return next()
                }

                return res.status(401).json({ message: 'Acesso Negado' })
                
            }

        )

        authRequest(req, res, next)

    },

    jwt: async (req: Request, res: Response, next: NextFunction) => {

        const authRequest = passport.authenticate('jwt', 
            
            (err: any, userId: number | false) => {

            
                if(userId) {
                    req.user = userId
                    return next()
                }
    
                return res.status(401).json({ message: 'Acesso Negado' })
    
            }
    
        )
    
        authRequest(req, res, next)
    
    }

}