import { HttpClientService } from "../../base/http.client.service";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginResponse } from "../../../models/responseModels/user/loginResponse";
import { ServiceResponse } from "../../serviceObjects";
import { convertException } from "../common";

const httpClientService = new HttpClientService();
const CONTROLLER = "User";

export const loginAsync = async (email: string, password: string): Promise<ServiceResponse> => {
    var result = new ServiceResponse();
    try{
        const loginResponse: any = await httpClientService.post(
        {
            controller: CONTROLLER,
            action: 'Login'
        }
        ,{ email: email, password: password });
        await AsyncStorage.setItem('token', loginResponse);
        result.data = loginResponse;
        result.succeeded = true;
    }
    catch (error: any){
        result.err = convertException(error.response.data.message, "Login Error");
        result.succeeded = false;
    }
    return result;
}