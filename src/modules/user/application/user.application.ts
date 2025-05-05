import { BaseApplication } from "../../../core/application/base.application";
import { UserResponse, UserResponseDto } from "../dtos/user-response.dto";
import { UserD } from "../models/model.user.domain";
import { UserPort } from "../ports/user.port";

export class UserAplication extends BaseApplication<
    UserD,
    UserPort,
    UserResponse,
    UserResponseDto
    >{

    //heredda para extender la clase
    constructor(
        private readonly userPort: UserPort

    ) {
        super(userPort, new UserResponseDto());
     }
    
     async findByEmail(email: string):Promise<UserD>{
        return this.userPort.findByEmail(email);
    }

    async findByEmailAndPassword(email: string, password: string):Promise<UserD> {
        return this.userPort.findByEmailAndPassword(email, password);
    }

    async existsByEmail(email:string):Promise<boolean> {
        return this.userPort.existsByEmail(email);
    }
    
}