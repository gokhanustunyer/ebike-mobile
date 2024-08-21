import { ErrorAlert, ServiceResponse } from "./serviceObjects";
import { Alert } from 'react-native';
import { HttpClientService } from "./base/http.client.service";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginResponse } from "../models/responseModels/user/loginResponse";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { checkAuthToken, logout } from "../redux/reducers/authReducer";
import { RegisterRequestModel } from "../models/requestModels/user/registerModel";
import { convertException } from "./base/common";


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
        await AsyncStorage.setItem('token', JSON.stringify(loginResponse.data));
        result.data = loginResponse;
        result.succeeded = true;
    }
    catch (error: any){
        result.err = convertException(error.response.data.message, "Login Error");
        result.succeeded = false;
    }

    return result;
}

export const logoutAsync = async () => {
    await AsyncStorage.removeItem('token');
}

export const registerUser = async (registerRequestModel: RegisterRequestModel): Promise<ServiceResponse> => {
    var result = new ServiceResponse();
    try{
        const registerResponse: any = await httpClientService.post(
        {
            controller: CONTROLLER,
            action: 'Register'
        }
        , JSON.stringify(registerRequestModel) );
        result.data = registerResponse;
        result.succeeded = true;
    }
    catch (error: any){
        result.err = (error.response.data.message) ?? error;
        result.succeeded = false;
    }
    return result;
}


