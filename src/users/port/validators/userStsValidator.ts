import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class UserStsValidator {

    @IsNotEmpty()
    identificacion!: string;

    @IsNumber()
    @Max(1)
    @Min(0)
    @IsNotEmpty()
    estado!: number;

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    exec_usuario!: number;
}