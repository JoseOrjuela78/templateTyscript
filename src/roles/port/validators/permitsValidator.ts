import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class PermitsValidator{
    
    @IsString()
    @IsNotEmpty()
    permisos!: string;

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    exec_usuario!: number;
}