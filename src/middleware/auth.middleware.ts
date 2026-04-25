import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';


export class AuthMiddleware {

    public static setup() {
        console.log('auth middle ware');
        
        return async (req: Request, res: Response, next: NextFunction) => {
            try {           
                const token = req.headers.authorization?.split(' ')[1];
                if (!token) {
                  return res.status(401).json({ message: 'Unauthorized' });
                }
        
                // Verify the JWT token
                const secretKey = 'abckderkdsfsdfdsfasdfsdf';
                const decoded: any = jwt.verify(token, secretKey);    
                
                const user = {userId: decoded.userId, roleId: decoded.roleId};
                if (!user) {
                  return res.status(401).json({ message: 'Unauthorized' });
                }
        
                // Attach the user to the request for further use in controllers
                // req.user = user;
                res.locals.user = user;
        
                // Continue to the route handler
                next();
                // next({ user })
              } catch (error: any) {
                console.error(error);
                if (error.name === 'TokenExpiredError') {
                  return res.status(401).json({ message: 'Token expired' });
                }
                return res.status(401).json({ message: 'Unauthorized' });
              }
        };
    }
}