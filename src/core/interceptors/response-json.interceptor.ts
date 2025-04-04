import { NextFunction, Response, Request } from 'express';

export const ResponseJson = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const originalJson = response.json;

    response.json = function (data: any) {
        if (response.statusCode === 200 || response.statusCode === 201) {
            return originalJson.call(
                this, {
                provider: "my app",
                status: "succes",
                statusCode: response.statusCode,
                result: {
                    response: data
                }
            }
            )
        } else if (response.statusCode >= 400 || response.statusCode < 600) {

            return originalJson.call(
                this, {
                provider: "my app",
                status: "error",
                statusCode: response.statusCode,
                result: {
                    response: data
                }
            }
            )
            
        }

        return originalJson.call(this, { data });
    };
    next();
};