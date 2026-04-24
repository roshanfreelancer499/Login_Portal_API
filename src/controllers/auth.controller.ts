import { Body, Get, Post, Route, Tags } from "tsoa";
import { Service } from "typedi";
import { AuthService } from "../services/authService";
import { CreateUser, LoginUser } from "../models/interfaces/user";

@Route("/api/auth")
@Service()
@Tags("Auth")

export default class AuthController {
  constructor(private authService: AuthService) { }

  @Post("/register")
  public async createUser(@Body() userDetails: CreateUser): Promise<LoginUser> {
    return await this.authService.createUser(userDetails);
  };

  @Get("/")
  public getUsers() {
    return [
      { id: 1, name: "Roshan" },
      { id: 2, name: "John" }
    ];
  };

  @Post("/login")
  public async loginUser(@Body() loginUser: {email: string, password: string}): Promise<LoginUser> {
    return await this.authService.loginUser(loginUser.email, loginUser.password);
  };
}