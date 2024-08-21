import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL } from '../../config/dev';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class HttpClientService {

  async get<T>(requestParameter: Partial<RequestParameters>, id?: string): Promise<AxiosResponse<T>> {
    let url: string = "";
    requestParameter.headers = await this.setHeaders(requestParameter.isAuth as boolean, requestParameter.headers) as { [key: string]: string };
    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.Url(requestParameter)}${id ? `/${id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    }
    return axios.get<T>(url, { headers: requestParameter.headers });
  }

  async post<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Promise<AxiosResponse<T>> {
    let url = "";
    requestParameter.headers = await this.setHeaders(requestParameter.isAuth as boolean, requestParameter.headers) as { [key: string]: string };
    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.Url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    }
    return axios.post<T>(url, body, { headers: requestParameter.headers });
  }

  async put<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Promise<AxiosResponse<T>> {
    let url = "";
    requestParameter.headers = await this.setHeaders(requestParameter.isAuth as boolean, requestParameter.headers) as { [key: string]: string };
    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.Url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    }
    return axios.put<T>(url, body, { headers: requestParameter.headers });
  }

  async delete<T>(requestParameter: Partial<RequestParameters>, id: string): Promise<AxiosResponse<T>> {
    let url = "";
    requestParameter.headers = await this.setHeaders(requestParameter.isAuth as boolean, requestParameter.headers) as { [key: string]: string };
    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.Url(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    }
    return axios.delete<T>(url, { headers: requestParameter.headers });
  }

  private Url(requestParameter: Partial<RequestParameters>): string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : BASE_URL}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }

  private async getAuthToken(): Promise<any> {
    const tokenData = await AsyncStorage.getItem('token');
    const token: any = JSON.parse(tokenData as string);
    return token.accessToken;
  };
  
  private async setHeaders(isAuth: boolean, headers: { [key: string]: string } | null | undefined): Promise<{ [key: string]: string } | null | undefined>{
    if (isAuth){
      const authToken = await this.getAuthToken();
      if (headers !== null && headers !== undefined){
        headers.Authorization = `Bearer: ${authToken}`;
      }
      else{
        headers = { Authorization: `Bearer: ${authToken}` }
      }
    }
    return headers;
  }
}

export class RequestParameters {
  fullEndPoint?: string;
  headers?: { [key: string]: string };
  controller?: string;
  action?: string;
  baseUrl?: string;
  queryString?: string;
  isAuth: boolean = false;
}
