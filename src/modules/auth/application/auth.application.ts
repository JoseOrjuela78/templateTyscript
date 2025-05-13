import { CypherService } from "../../../core/utils/cypher.service";
import { TokenService } from "../../../core/utils/token.service";
import { UserD } from "../../user/models/model.user.domain";
import { UserPort } from "../../user/ports/user.port";
import { AuthD } from "../models/auth";
import { Tokens } from "../ports/auth.port";

export class AuthAplication{
    constructor(private readonly userPort: UserPort) { }
    
    async login(auth: AuthD): Promise<Tokens | null>{
        const filtro: any =[{ EMAIL: auth.email }];
        const result:any = await this.userPort.getByPage(null, null, null, 1, filtro)

        if (result.data.length == 0) {
            return null;    
        };
        const userFound: UserD = result.data[0];
     
        const passwordMatch = await CypherService.compare(auth.password, String(userFound.password));

        if (!passwordMatch) {
             return null; 
        }

        return {
             accessToken: TokenService.generateAccessToken(Number(userFound.user_id), userFound.name),
             refreshToken: userFound.refreshToken ?? ""
        }
        
    }

    async refreshToken(refreshToken: string): Promise<Tokens | null> { 

        const filtro: any =[{ REFRESHTOKEN: refreshToken }];

        const result:any = await this.userPort.getByPage(null, null, null, 1, filtro)

        if (result.data.length == 0) {
            return null;    
        };
        const userFound: UserD = result.data[0];

       return {
            accessToken: TokenService.generateAccessToken(Number(userFound.user_id), userFound.name),
            refreshToken: userFound.refreshToken ?? ""
       }
              
    }


}