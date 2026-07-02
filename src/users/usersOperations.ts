import database from "../common/database/data-source";
import { IUserDb } from "./port/IUserDb";
import { IUserDom } from "./port/IUserDom";
import { UserDto } from "./port/userDto";

class UserOperations {
    constructor(private readonly db: typeof database){}

    async createUser(user:IUserDom){
       try {
            const userdb:IUserDb = UserDto.FromDomainToDb(user) as IUserDb;
            const result:any = await this.db.execQuery(`${userdb}`);
            return {
                status_code: result.code,
                status_desc: result.message
            };

       } catch (error:any) {
            return {
                    status_code: error.code,
                    status_desc: error.message
                   };
       }; 
       
    };
}

const operations = new UserOperations(database);
export default operations;