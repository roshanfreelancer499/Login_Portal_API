import { Service } from "typedi";
import { UserRepository } from "../repositories/user.respository";
import User from "../entities/user.entity";

@Service()

export class UserService {
    constructor(private userRepo: UserRepository) {}

    getAllUsers(): Promise<User[]> {
        return this.userRepo.getAllUsers();
    }
}