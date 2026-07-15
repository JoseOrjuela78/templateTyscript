import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class UserPassValidator {

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    id_usuario!: number;

    @IsNotEmpty()
    pass!: string;

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    exec_usuario!: number;
}