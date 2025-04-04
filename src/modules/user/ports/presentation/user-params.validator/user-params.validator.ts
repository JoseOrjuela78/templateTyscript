
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min } from "class-validator";



export class IdValidator {

    @IsNotEmpty({message:'El id es requerido'})
    @IsNumber()
    @Min(1)
    @Type(()=>Number)
    id!: number;
}