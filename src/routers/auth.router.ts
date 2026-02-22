import Express from "express";
import Container from "typedi";
import AuthController from "../controllers/auth.controller";
import { Validation } from "../middleware/validation";
import { CreateUser } from "../models/joi-schemas/createuser";

const authRouter = Express.Router()
const authController = Container.get(AuthController);

authRouter.get('/', async (req, res) => {
    try {
        const users = authController.getUsers();
        res.status(200).send(users)

    } catch (error: any) {
        console.error(error?.message)
    }
});

authRouter.post('/register', Validation.run(CreateUser.schema(), 'body'), async (req, res) => {
    try {
        const userDetails = req.body;
        const result = await authController.createUser(userDetails);
        res.status(200).send({
            message: 'User Registered Successfully',
            userDetails: result,
        })
    } catch (error) {
        console.log(error);

    }
})

export default authRouter;