import { Service } from "typedi";
import { UserRepository } from "../repositories/user.respository";
import { CreateUser } from "../models/interfaces/user";
import User from "../entities/user.entity";

@Service()

export class AuthService {
    constructor(private userRepo: UserRepository) {}

    createUser(userDetails: CreateUser): Promise<User> {
        return this.userRepo.createUser(userDetails);
    }
}