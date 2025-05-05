import { Expose, plainToInstance } from "class-transformer";
import { RolesD } from "../models/model.roles.domain";
import { IResponseDto } from "../../../core/interfaces/response-dto";


export class RolesResponse{

    @Expose()
    f_create!: Date;
    @Expose()
    f_update!: Date;
    @Expose()
    id_role!: number;
    @Expose()
    rol_name!: string; 
    @Expose()
    status!: number;
    @Expose()
    user_exec!: number;
  
};

export class RolesResponseDto implements IResponseDto<RolesD, RolesResponse> {
    
  fromDomainToResponse(model: RolesD | RolesD[]): RolesResponse | RolesResponse[] {
        if (Array.isArray(model)) {
            return model.map(user => this.fromDomainToResponse(user)) as RolesResponse[];
        }

        return plainToInstance(RolesResponse, model,
            {
                excludeExtraneousValues: true
             });
    }
}