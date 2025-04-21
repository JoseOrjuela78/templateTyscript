import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, MaxLength, Min, MinLength } from "class-validator";

export class PathValidator {

    @IsNotEmpty()
    @IsNumber()
    id_menu!: number;
  
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(500)
    path!: string; 

    @IsNotEmpty()
    @IsNumber()
    id_action!: number;

 }

export class PathUpdateValidator {

    @IsNotEmpty()
    @IsNumber()
    id_path!: number;

    @IsNotEmpty()
    @IsNumber()
    id_menu!: number;
  
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(500)
    path!: string; 

    @IsNotEmpty()
    @IsNumber()
    id_action!: number;
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