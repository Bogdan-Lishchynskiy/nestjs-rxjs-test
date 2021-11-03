// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// import { defer, Observable, from } from 'rxjs';
// import { map } from 'rxjs/operators';

// enum StatusCode {
//   Unauthorized = 401,
//   Forbidden = 403,
//   NotFound = 404,
//   TooManyRequests = 429,
//   InternalServerError = 500,
// }
// const headers: Readonly<Record<string, string>> = {
//   Accept: 'application/json',
//   'Content-Type': 'application/json; charset=utf-8',
//   'X-Requested-With': 'XMLHttpRequest',
// };

// // We can use the following function to inject the JWT token through an interceptor
// // We get the `accessToken` from the localStorage that we set when we authenticate
// const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
//   try {
//     // let token = localStorage.getItem("accessToken");
//     let token = `${process.env.TOKEN}`;
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// export class HttpService {
//   private instance: AxiosInstance | null = null;

//   private get http(): AxiosInstance {
//     return this.instance != null ? this.instance : this.initHttp();
//   }

//   initHttp() {
//     const http = axios.create({
//       baseURL: `${process.env.BASE_URL}`,
//       headers,
//       withCredentials: true,
//     });
//     http.interceptors.request.use(injectToken, (error) =>
//       Promise.reject(error),
//     );

//     http.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         const { response } = error;

//         return this.handleError(response);
//       },
//     );

//     this.instance = http;

//     return http;
//   }

//   get<T = any>(url: string, config?: object): Observable<T> {
//     return defer(() => this.http.get<T>(url, { params: config })).pipe(
//       map((result) => result.data),
//     );
//   }

//   // Handle global app errors
//   // We can handle generic app errors depending on the status code
//   private handleError(error) {
//     const { status } = error;

//     switch (status) {
//       case StatusCode.NotFound: {
//         console.log(status);
//         // Handle NotFound
//         break;
//       }
//       case StatusCode.InternalServerError: {
//         console.log(status);
//         // Handle InternalServerError
//         break;
//       }

//       case StatusCode.Forbidden: {
//         console.log(status);
//         // Handle Forbidden
//         break;
//       }
//       case StatusCode.Unauthorized: {
//         console.log(status);
//         // Handle Unauthorized
//         break;
//       }
//       case StatusCode.TooManyRequests: {
//         // Handle TooManyRequests
//         break;
//       }
//     }
//     return Promise.reject(error);
//   }
// }

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class HttpConsumingService {
  private readonly url = `${process.env.BASE_URL}`;
  constructor(private readonly http: HttpService) {}

  get(url: string, config?: AxiosRequestConfig): Observable<any> {
    let token = `${process.env.TOKEN}`;

    const headersRequest = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get(url, { headers: headersRequest }).pipe(
      map((axiosResponse: AxiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }
}
