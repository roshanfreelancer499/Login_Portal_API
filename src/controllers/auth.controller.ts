import { Controller, Get, Route, Tags } from "tsoa";
import { Service } from "typedi";

@Route("api/auth")
@Service()
@Tags("Auth")
export default class AuthController {

  @Get("/")
  public getUsers() {
    return [
      { id: 1, name: "Roshan" },
      { id: 2, name: "John" }
    ];
  }
}