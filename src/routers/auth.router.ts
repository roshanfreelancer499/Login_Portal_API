import Express from "express";
import Container from "typedi";
import AuthController from "../controllers/auth.controller";
import { Validation } from "../middleware/validation";
import { ApiError } from "../models/api-error";
import { UserSchema } from "../models/joi-schemas/createuser";

const authRouter = Express.Router()
const authController = Container.get(AuthController);

authRouter.post('/register', Validation.run(UserSchema.create(), 'body'), async (req, res, next) => {
    try {
        const userDetails = req.body;
        const result = await authController.createUser(userDetails);
        res.status(200).send({
            message: 'User Registered Successfully',
            userDetails: result,
        })
    } catch (error: any) {
        console.log(error?.message);
        next(new ApiError('Auth.register', error?.message));
    }
});

authRouter.post("/login", Validation.run(UserSchema.login(), 'body'), async (req, res, next) => {
    try {
          const {token, ...loggedUser} = await authController.loginUser(req.body);
            res.status(200).send({
            message: "Login Success",
            user: loggedUser,
            token
        });
    } catch (error: any) {
        console.error(error?.message);
        next(new ApiError("Auth.loginUser", error?.message))
    };
})

export default authRouter;