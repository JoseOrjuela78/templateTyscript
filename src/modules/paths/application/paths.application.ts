import { BaseApplication } from "../../../core/application/base.application";
import { PathsResponse, PathsResponseDto } from "../dtos/paths-response.dto";
import { PathsD } from "../models/model.paths.domain";
import { PathsPort } from "../ports/paths.port";



export class PathsAplication extends BaseApplication<
    PathsD,
    PathsPort,
    PathsResponse,
    PathsResponseDto
    >{

    //heredda para extender la clase
    constructor(
        private readonly pathsPort: PathsPort

    ) {
        super(pathsPort, new PathsResponseDto());
     }

}