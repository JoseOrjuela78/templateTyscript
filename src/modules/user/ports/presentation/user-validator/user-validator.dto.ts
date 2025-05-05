import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, Matches, MaxLength, Min, MinLength } from "class-validator";


export class UserValidator {

    @IsNotEmpty()
    @IsNumber()
    type_doc_id!: number;
    
    @IsNotEmpty()
    @MinLength(6,{message:'id deber tener minimo 6'})
    @MaxLength(25)
    id!: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200)
    name!: string;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(25)
    e_activity!: string;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(25)
    city_id!: string;

    @IsNotEmpty()
    @Type(()=> Date)    
    birth_date!: Date

    @IsNotEmpty()
    @IsEmail()
    email!: string;
    
    @IsNotEmpty()
    @IsNumber()
    pep!: number;

    @IsNotEmpty()
    @IsNumber()
    rol_id!: number;

    password!: string;

}

export class UserUpdateValidator { 

    @IsNotEmpty()
    @IsNumber()
    user_id!: number;
 
    @IsNotEmpty()
    @IsNumber()
    type_doc_id!: number;
    
    @IsNotEmpty()
    @MinLength(6,{message:'id deber tener minimo 6'})
    @MaxLength(25)
    id!: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200)
    name!: string;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(25)
    e_activity!: string;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(25)
    city_id!: string;

    @IsNotEmpty()
    @Type(()=> Date)    
    birth_date!: Date

    @IsNotEmpty()
    @IsEmail()
    email!: string;
    
    @IsNotEmpty()
    @IsNumber()
    pep!: number;

    @IsNotEmpty()
    @IsNumber()
    rol_id!: number;

    password!: string;


}

export class InactivateParamsValidator {

    @IsNotEmpty({message:'El id es requerido'})
    @IsNumber()
    @Min(1)
    @Type(()=>Number)
    id!: number;

    
    @IsNotEmpty({ message: 'El status es requerido' })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    status!: number;
    
    @IsNotEmpty({ message: 'El user_exe es requerido' })
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    user_exe!: number
}