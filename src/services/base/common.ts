import { ErrorAlert } from "../serviceObjects";


export const convertException = (err: any, title: string): ErrorAlert => {
    let error = new ErrorAlert();
    error.title = title;
    error.message = err as string;
    return error;
}