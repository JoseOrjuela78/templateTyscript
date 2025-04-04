import { IsEmail, IsNotEmpty, IsNumber, Matches, MaxLength, MinLength } from "class-validator";


export class UserValidator {
    @IsNotEmpty({message:'El primer nombre es requerido'})
    @MinLength(3,{message:'deber tener minimo 3'})
    @MaxLength(25)
    numeroCedula!: number;
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(25)
    alias!: string;
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    nombres!: string;
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    apellidos!: string;
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    fijo!: string;
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    celular!: string;
    @IsNotEmpty()
    @IsEmail()
    correo!: string;
    @Matches(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/,{message:'contraseña no valida'})
    contraseña!: string;
    @IsNotEmpty()
    @IsNumber()
    rol!: number;
    @IsNotEmpty()
    @IsNumber()
    estado!: number;
}