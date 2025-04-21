import { BaseApplication } from "../../../core/application/base.application";
import { MenuResponse, MenuResponseDto } from "../dtos/menu-response.dto";

import { MenuD } from "../models/model.menu.domain";
import { MenuPort } from "../ports/menu.port";


export class MenuAplication extends BaseApplication<
    MenuD,
    MenuPort,
    MenuResponse,
    MenuResponseDto
    >{

    //heredda para extender la clase
    constructor(
        private readonly menuPort: MenuPort

    ) {
        super(menuPort, new MenuResponseDto());
     }

}