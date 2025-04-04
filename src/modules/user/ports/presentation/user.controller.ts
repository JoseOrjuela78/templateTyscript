import { Request , Response} from "express";
import { UserAplication } from "../../application/user.application";
import { UserD } from '../../models/model.user.domain';
import { UserValidator } from "./user-validator/user-validator.dto";
import { ValidatorBody, ValidatorParameters } from "../../../../core/utils/decorator.service";
import { IdValidator } from "./user-params.validator/user-params.validator";

export class UserController {
    constructor(
        private readonly application: UserAplication
    ) { }
  
   // @ValidatorBody(UserValidator)
    @ValidatorParameters(IdValidator)
    async create(request: Request, response: Response) {

    const { id } = request.params;
        
        console.log({ id });   
    const { numeroCedula, alias, nombres, apellidos, fijo, celular, correo, contraseña, rol, estado } = request.body;
        
       
        const UserDomanin : UserD = {
            numeroCedula,
            alias,
            nombres,
            apellidos,
            fijo,
            celular,
            correo,
            contraseña,
            rol,
            estado,
            fecha_creacion: "",
            fecha_actualizacion: ""
        };
              
       const user = await this.application.create(UserDomanin);
       response.status(201).json(user);
       
    }

}