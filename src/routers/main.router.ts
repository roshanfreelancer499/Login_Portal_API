import Express from "express"
import userRouter from "./user.router"
import { AdminMiddleWare } from "../middleware/admin.middleware";

const mainRouter = Express.Router()

mainRouter.use('/users', AdminMiddleWare.setup(), userRouter);

export default mainRouter;