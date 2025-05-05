import { Expose, plainToInstance } from "class-transformer";
import { PathsD } from '../models/model.paths.domain';
import { IResponseDto } from "../../../core/interfaces/response-dto";


export class PathsResponse{

    @Expose()
    f_create!: Date;
    @Expose()
    f_update!: Date
    @Expose()
    id_path!: number;
    @Expose()
    id_menu!: number;
    @Expose()
    path!: string; 
    @Expose()
    id_action!: number; 
    @Expose()
    status!: number;
    @Expose()
    user_exec!: number;

};

export class PathsResponseDto implements IResponseDto<PathsD, PathsResponse> {
        
    fromDomainToResponse(model: PathsD | PathsD[]): PathsResponse | PathsResponse[] {
        if (Array.isArray(model)) {
            return model.map(user => this.fromDomainToResponse(user)) as PathsResponse[];
        }

        return plainToInstance(PathsResponse, model,
            {
                excludeExtraneousValues: true
             });
    }
}