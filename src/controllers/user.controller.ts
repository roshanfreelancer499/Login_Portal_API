import { Get, Route, Security, Tags } from "tsoa";
import { Service } from "typedi";
import { UserService } from "../services/user.service";

@Route('/api/users')
@Service()
@Tags('Users')
@Security("bearerAuth")
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/allUsers')
    public async getAllUsers() {
        return this.userService.getAllUsers();
    }
}