import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, MaxLength, Min, MinLength } from "class-validator";


export class ListaValidator {
  
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    nombre_lista!: string; 

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    descripcion_lista!: string; 

}

export class ListaUpdateValidator {

    @IsNotEmpty()
    @IsNumber()
    id_lista!: number;
  
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    nombre_lista!: string; 

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    descripcion_lista!: string; 
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