import database from "../common/database/data-source";
import { IUserDb } from "./port/models/IUserDb";
import { IUserDom } from "./port/models/IUserDom";
import { UserDto } from "./port/userDto";

class UserOperations {
    constructor(private readonly db: typeof database){}

    async createUser(user:IUserDom){
       try {
            const userdb:IUserDb = UserDto.FromDomainToDb(user) as IUserDb;
            //const result:any = await this.db.execQuery(`${userdb}`);
            let data:any = UserDto.FromDbToDomain(userdb);
            delete data.pass;
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
}

export default UserOperations;