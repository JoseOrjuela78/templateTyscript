import msDatabase from "../common/database/data-mssql";
import { ILogin } from "./port/models/ILogin";
import { IUserDb } from "./port/models/IUserDb";
import { IUserDom } from "./port/models/IUserDom";
import { UserDto } from "./port/userDto";
import sql from 'mssql';

class UserOperations {
  
    constructor(private readonly db: typeof msDatabase){}

    async createUser(user:IUserDom){
       try {
            const userdb:IUserDb = UserDto.FromDomainToDb(user) as IUserDb;
            //const result:any = await this.db.execQuery(`${userdb}`);
            let data:any = UserDto.FromDbToDomain(userdb);
           // delete data.pass;
            return {
                status_code: 200,//result.code,
                status_desc: 'User created',//result.message
                data
            };

       } catch (error:any) {
            return {
                    status_code: error.code,
                    status_desc: error.message
                   };
       }; 
       
    };

    async login(bd:ILogin){
       try {
            const result:any = await this.db.executeStoredProcedure(
                'PR_LOGIN',
                {
                email: { type: sql.VarChar, value: bd.email }
                },
                { 
                pass: sql.VarChar(100),
                status_code: sql.Int,
                status_desc: sql.VarChar(500)
                }
            );
        
            const user = result.recordsets[0][0];
            const menus = result.recordsets[1];
            const restricciones = result.recordsets[2];

            return {
                    pass: result.output.pass,
                    user,
                    menus,
                    restricciones,
                    status_code: result.output.status_code,
                    status_desc: result.output.status_desc
                   };

       } catch (error:any) {
            return {
                    status_code: error.code,
                    status_desc: error.message
                   };
       }; 
       
    };
}

export default UserOperations;