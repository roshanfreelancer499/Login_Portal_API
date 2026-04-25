import { Service } from "typedi";
import dbConfig from "../config/db.config";
import User from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { CreateUser, LoginUser } from "../models/interfaces/user";
import { ApiError } from "../models/api-error";
import jwt from "jsonwebtoken";

@Service()

export class UserRepository {
    private userRepository = dbConfig.getRepository(User);

    async createUser(userDetails: CreateUser): Promise<LoginUser> {
        await this.isUserExist(userDetails);
        userDetails.password = await this.encriptPassword(userDetails.password);
        return this.userRepository.save(userDetails);
    };

    async isUserExist(userDetails: CreateUser): Promise<boolean> {
        const userExist = await this.userRepository.findOne({
            where: [
                { email: userDetails.email },
                { phoneNumber: userDetails.phoneNumber }
            ],
        });

        if (userExist) {
            if (userExist.email === userDetails.email) {
                throw (`User already exist with email ${userDetails.email}`)
            };

            if (userExist.phoneNumber === userDetails.phoneNumber) {
                throw (`User already exist with phone number ${userDetails.phoneNumber}`)
            };
        }

        return !!userExist;
    };
    
    async encriptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    };

    async verifyPassword(inputPassword: string, storedPassword: string): Promise<boolean> {
        return bcrypt.compare(inputPassword, storedPassword);
    }

    async loginUser(userEmail: string, userPassword: string): Promise<LoginUser> {
        const isUserExist = await this.userRepository.createQueryBuilder('user')
                            .addSelect('user.password')
                            .where('user.email =:email', {email: userEmail})
                            .getOne();
        if (!isUserExist) throw new ApiError("exse", "User Not Found Please Check Credentials");

        const isPassMatched = await this.verifyPassword(userPassword, isUserExist.password);
        if (!isPassMatched) throw("Incorrect Password Please Check the Password");
        const token = this.generateJWTTokern(isUserExist);
        const {password, ...loggedUser} = isUserExist;
        return {...loggedUser, token};
    };

    generateJWTTokern(user: LoginUser): string {
        const accessToken = 'abckderkdsfsdfdsfasdfsdf'
        return jwt.sign(
            {
                userId: user.userId,
                roleId: 1
            },
            accessToken,
            {
                expiresIn: '15m'
            }
        )
    };

    getAllUsers(): Promise<User[]> {
        return this.userRepository.findBy({isActive: true})
    };
}