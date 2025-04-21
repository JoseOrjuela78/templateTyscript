import { BaseApplication } from "../../../core/application/base.application";
import { RolesResponse, RolesResponseDto } from "../dtos/roles-response.dto";
import { RolesD } from "../models/model.roles.domain";
import { RolesPort } from "../ports/roles.port";

export class RolesAplication extends BaseApplication<
    RolesD,
    RolesPort,
    RolesResponse,
    RolesResponseDto
    >{

    //heredda para extender la clase
    constructor(
        private readonly rolesPort: RolesPort

    ) {
        super(rolesPort, new RolesResponseDto());
     }

}