import { Service } from "typedi";
import dbConfig from "../config/db.config";
import User from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { CreateUser } from "../models/interfaces/user";

@Service()

export class UserRepository {
    private userRepository = dbConfig.getRepository(User);

    async createUser(userDetails: CreateUser): Promise<User> {
        console.log('first', userDetails);
        
        await this.isUserExist(userDetails);
        userDetails.password = await this.encriptPassword(userDetails.password);
        console.log('second', userDetails);
        
        return this.userRepository.save(userDetails);
    };

    async isUserExist(userDetails: CreateUser): Promise<void> {
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
        console.log('checking', userDetails);
        
    };
    
    async encriptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    };
}