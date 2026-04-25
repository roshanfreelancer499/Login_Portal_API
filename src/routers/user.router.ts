import Express from "express";
import Container from "typedi";
import { ApiError } from "../models/api-error";
import { UserController } from "../controllers/user.controller";

const userRouter = Express.Router();
const userController = Container.get(UserController);

userRouter.get('/allUsers', async (req, res, next) => {
    try {
        const users = await userController.getAllUsers();
        res.status(200).send(users);
    } catch (error: any) {
        console.log(error?.message);
        next(new ApiError("userRoute.getAllUsers", error?.message))
    }
});

export default userRouter;