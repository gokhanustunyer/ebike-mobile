

export class ServiceResponse{
    err: any;
    data: any;
    succeeded: boolean = false;
}

export class ErrorAlert{
    title: string = "";
    message: string = "";
    type: ErrorType = 1;
}

export enum ErrorType{
    Error,
    Info,
    Success
}