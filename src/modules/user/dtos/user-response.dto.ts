import { Expose, plainToInstance } from "class-transformer";
import { UserD } from "../models/model.user.domain";
import { IResponseDto } from "../../../core/interfaces/response-dto";



export class UserResponse {

    @Expose()
    f_create!: Date;
    @Expose()
    f_update!: Date
    @Expose()
    user_id!: number;
    
    person_id!: number;
    
    type_doc_id!: number;
    @Expose()
    type_doc!: string;
    @Expose()
    id!: string;
    @Expose()
    name!: string; 
    @Expose()
    e_activity!: string; 
    @Expose()
    city_id!: string;
    @Expose()
    birth_date!: Date
    @Expose()
    email!: string;
    @Expose()
    pep!: number;
  
    rol_id!: number;
   
    rol_name!: string;
    
    password!: string;
    
    status!: number;
    @Expose()
    user_exec!: number;
}

export class UserResponseDto implements IResponseDto<UserD,UserResponse> {
    fromDomainToResponse(model: UserD | UserD[]): UserResponse | UserResponse[] {
        if (Array.isArray(model)) {
            return model.map(user => this.fromDomainToResponse(user)) as UserResponse[];
        }

        return plainToInstance(UserResponse, model,
            {
                excludeExtraneousValues: true
             });
    }
}