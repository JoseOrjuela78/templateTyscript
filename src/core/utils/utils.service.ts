export class UtilService{

static extractErrorMessages(errors: any[]):string[] {
    let messages: string[] = [];

    errors.forEach((error) => {
        if (error.constraints) {
            messages = messages.concat(Object.values(error.constraints))
        }

        if (error.children && error.children.length > 0) {
            messages = messages.concat(UtilService.extractErrorMessages(error.children))
        }
    });

    return messages;
}


}