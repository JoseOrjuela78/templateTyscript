import { Expose, plainToInstance } from "class-transformer";
import { UserD } from "../models/model.user.domain";

export class UserResponse {


    @Expose()
    consecutivo?: number;
    @Expose({groups:['admin','operator']})
    fecha_creacion!: string;
    @Expose()
    fecha_actualizacion!: string;
    @Expose({groups:['admin']})
    numeroCedula!: number;
    @Expose({groups:['admin']})
    alias!: string;
    @Expose()
    nombres!: string;
    @Expose()
    apellidos!: string;
    @Expose()
    fijo!: string;
    @Expose()
    celular!: string;
    @Expose()
    correo!: string;

    contraseña!: string;
    rol!: number;
    estado!: number;
}

export interface IResponseDto<Model, Response>{
    fromDomainToResponse(model: Model | Model[]): Response | Response[];    
};


export class UserResponseDto implements IResponseDto<UserD,UserResponse> {
    fromDomainToResponse(model: UserD | UserD[]): UserResponse | UserResponse[] {
        if (Array.isArray(model)) {
            return model.map(user => this.fromDomainToResponse(user)) as UserResponse[];
        }

        return plainToInstance(UserResponse, model,
            {
                excludeExtraneousValues: true,
                groups:['admin','operator']
             });
    }
}