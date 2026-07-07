import { string } from "joi";
import { error } from "node:console";

export class UtilService {

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

};