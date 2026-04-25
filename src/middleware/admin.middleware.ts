import { NextFunction } from "express";


export class AdminMiddleWare {
    public static setup() {
        return (req: any, res: any, next: NextFunction) => {
            try {
                if (!res.locals.user || res.locals.user.roleId !== 1) {
                   return res.status(401).send({message: "User dont access to enter this route"})
                }
                next();
            } catch (error) {
                console.error(error);
            }
            
        }
    }
}