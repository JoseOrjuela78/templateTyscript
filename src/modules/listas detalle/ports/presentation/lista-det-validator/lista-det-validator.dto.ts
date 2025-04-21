import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, MaxLength, Min, MinLength } from "class-validator";

export class ListaDetalleValidator {

    @IsNotEmpty()
    @IsNumber()
    id_list!: number;
  
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    value!: string; 

    @IsNotEmpty()
    @MaxLength(100)
    params!: string; 

}

export class ListaDetalleUpdateValidator {

    @IsNotEmpty()
    @IsNumber()
    id_list_det!: number;

    @IsNotEmpty()
    @IsNumber()
    id_list!: number;
  
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    value!: string; 

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    params!: string; 
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