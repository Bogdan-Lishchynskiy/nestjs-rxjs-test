import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class HttpConsumingService {
  constructor(private readonly http: HttpService) {}

  get<T>(url: string, config?: AxiosRequestConfig): Observable<T> {
    let token = `${process.env.TOKEN}`;
    const headersRequest = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http
      .get(url, { headers: headersRequest })
      .pipe(map((axiosResponse: AxiosResponse<T>) => axiosResponse.data));
  }
}
