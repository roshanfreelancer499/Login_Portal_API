import { Service } from "typedi";
import { UserRepository } from "../repositories/user.respository";
import { CreateUser, LoginUser } from "../models/interfaces/user";
import User from "../entities/user.entity";

@Service()

export class AuthService {
    constructor(private userRepo: UserRepository) {}

    createUser(userDetails: CreateUser): Promise<LoginUser> {
        return this.userRepo.createUser(userDetails);
    };

    loginUser(email: string, password: string): Promise<LoginUser> {
       return this.userRepo.loginUser(email, password);
    };
}