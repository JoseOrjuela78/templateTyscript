import { validate } from 'class-validator';
import { Request,Response } from 'express';
import { UtilService } from './utils.service';
import { plainToInstance } from 'class-transformer';

export function ValidatorBody(validator: new (...args: any[]) => any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (request: Request, response: Response) {
            const instance = new validator();
            Object.keys(request.body).forEach((key) => {
                instance[key] = request.body[key];
            });

            const errors = await validate(instance);
            if (errors.length) {
                const errorMessages = UtilService.extractErrorMessages(errors)
                response.status(411).json(errorMessages);
                return;
            }
            return originalMethod.apply(this, [request, response])
        };
    };
};

export function ValidatorParameters(validator: new (...args: any[]) => any) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (request: Request, response: Response) {
            const instance = plainToInstance(validator, request.params);
            const errors = await validate(instance);
            if (errors.length) {
                const errorMessages = UtilService.extractErrorMessages(errors)
                response.status(411).json(errorMessages);
                return;
            }
            return originalMethod.apply(this, [request, response])
        };
    };
};