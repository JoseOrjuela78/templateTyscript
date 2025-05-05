import { Expose, plainToInstance } from "class-transformer";
import { MenuD } from "../models/model.menu.domain";
import { IResponseDto } from "../../../core/interfaces/response-dto";


export class MenuResponse {

    @Expose()
    f_create!: Date;
    @Expose()
    f_update!: Date;
    @Expose()
    id_menu?: number;
    @Expose()
    menu_title!: string; 
    @Expose()
    type!: string; 
    @Expose()
    icon!: string; 
    @Expose()
    path!: string; 
    @Expose()
    depend!: number;
    @Expose()
    status!: number;
    @Expose()
    user_exec!: number;

}


export class MenuResponseDto implements IResponseDto<MenuD, MenuResponse> {
    
    
    fromDomainToResponse(model: MenuD | MenuD[]): MenuResponse | MenuResponse[] {
        if (Array.isArray(model)) {
            return model.map(user => this.fromDomainToResponse(user)) as MenuResponse[];
        }

        return plainToInstance(MenuResponse, model,
            {
                excludeExtraneousValues: true
             });
    }
}