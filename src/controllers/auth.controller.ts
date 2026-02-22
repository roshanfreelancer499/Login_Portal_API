import { Body, Get, Post, Route, Tags } from "tsoa";
import { Service } from "typedi";
import { AuthService } from "../services/authService";
import { CreateUser } from "../models/interfaces/user";
import User from "../entities/user.entity";

@Route("/api/auth")
@Service()
@Tags("Auth")

export default class AuthController {
  constructor(private authService: AuthService) { }

  @Post("/register")
  public async createUser(@Body() userDetails: CreateUser): Promise<User> {
    return await this.authService.createUser(userDetails);
  };

  @Get("/")
  public getUsers() {
    return [
      { id: 1, name: "Roshan" },
      { id: 2, name: "John" }
    ];
  };
}