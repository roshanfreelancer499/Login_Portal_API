import Express from "express";
import Container from "typedi";
import AuthController from "../controllers/auth.controller";

const authRouter = Express.Router()
const authController = Container.get(AuthController);

authRouter.get('/', async (req, res) => {
    try {
      const users =  authController.getUsers();
        res.status(200).send(users)

    } catch (error: any) {
        console.error(error?.message)
    }
});

export default authRouter;