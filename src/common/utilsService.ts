import { Parser } from 'json2csv';
import { validate } from 'class-validator';

export class UtilService {
/*
    // objetivo: extraer mensajes de error del validator
    static extractErrorMessages(errors:any[]):string[]{
        let messages:string[] = [];
        errors.forEach((error)=>{
            if(error.constraints){
                messages = messages.concat(Object.values(error.constraints));
            };

            if(error.children && error.children.length > 0){
                messages = messages.concat(Object.values(error.children));
            }
        });
        return messages;
    };
    */

    // objetivo: convertir un array en un array de por lotes
    static createChunckArray(items:any[], batchSize:number):any[]{

        if (!Array.isArray(items)) {
            throw new TypeError('items debe ser un array');
        };

        if (!Number.isInteger(batchSize) || batchSize < 1) {
            throw new TypeError('batchSize debe ser un entero mayor a 0');
        };

        const chunks = [];

        for (let i = 0; i < items.length; i += batchSize) {
            chunks.push(items.slice(i, i + batchSize));
        };

        return chunks;
    };

    // objetivo: convertir un json en formato csv

    static async createCSV(data: any[]) {
        const fields = Object.keys(data[0]);
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(data);
        return csv;
    };

    // objetivo: crear esquema para creacion de permisois rol

    static async createRolSchema(idRol: string|null, acciones: any[], menus: any[]) {
        
        const rolSchema: any = [];

        if (idRol === '0') idRol = null;

        menus.forEach(Element => {

            const row = {
                idRol: idRol,
                titulo: Element.TITULO,
                idMenu: Element.ID_MENU,
                idAction: acciones.map(x => ({ codigo: x.CODIGO, valor: x.VALOR, status: 0 }))
            };

            rolSchema.push(row);

        });

        return rolSchema;
    };

    //validar path equivalentes

    static pathToRegex(path:string, pathPequest:string){

        if (path === pathPequest) return true;

        const regex = new RegExp('^' + path.replace(/:\w+/g, '[^/]+') + '$');

        return regex.test(pathPequest);
    };

    // objetivo: extraer mensajes de error del validator
    static async validateErrors(obj:Object){
        const errors = await validate(obj);
        let errorsMessages:any[] = [];

        if(errors.length > 0){
            errors.forEach((error)=>{
                if(error.constraints){
                    errorsMessages = errorsMessages.concat(Object.values(error.constraints));
                };

                if(error.children && error.children.length > 0){
                    errorsMessages = errorsMessages.concat(Object.values(error.children));
                };
            });
        };

        return errorsMessages;
    }

};