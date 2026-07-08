import { IsEmail, IsNotEmpty, IsNumber, Min } from "class-validator";

export class LoginValidator {

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    pass!: string;

}