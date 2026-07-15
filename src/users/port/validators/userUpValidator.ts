import { IsEmail, IsNotEmpty, IsNumber, Min } from "class-validator";

export class UserUpValidator {

    id_usuario!: number;

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    tipo_persona!: number;

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    tipo_identificacion!: number;

    @IsNotEmpty()
    identificacion!: string;

    @IsNotEmpty()
    razon_social!: string;

    @IsNotEmpty()
    nombre1!: string;

    @IsNotEmpty()
    nombre2!: string;

    @IsNotEmpty()
    apellido1!: string;

    @IsNotEmpty()
    apellido2!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNumber()
    @IsNotEmpty()
    genero!: number;

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    ciudad!: number;

    @IsNotEmpty()
    telefono!: string;

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    id_rol!: number;

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    exec_usuario!: number;
}