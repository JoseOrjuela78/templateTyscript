import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, MaxLength, Min, MinLength } from "class-validator";


export class MenuValidator {
  
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    menu_title!: string; 

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    type!: string; 

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    icon!: string; 

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    path!: string; 


    @IsNotEmpty()
    @IsNumber()
    depend!: number;
}

export class MenuUpdateValidator {

    @IsNotEmpty()
    @IsNumber()
    id_menu!: number;
  
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    menu_title!: string; 

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    type!: string; 

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    icon!: string; 

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    path!: string; 


    @IsNotEmpty()
    @IsNumber()
    depend!: number;
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