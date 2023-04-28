import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";
import {MassageAndLoadingService} from "./massage-and-loading.service";
import {catchError, finalize} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class BaseHttpService {
  readonly SERVER_NOT_RESPOND = "There is an error on server, Please contact support.";
  readonly APP_BASE_HREF = '/api/';

  constructor(private httpClient: HttpClient, private massageAndLoadingService: MassageAndLoadingService) {
  }

  get<T>(url: string, options?: {
    activateLoading: boolean,
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    if (options?.activateLoading) this.massageAndLoadingService.startLoading();
    return this.httpClient.get<T>(url, options).pipe(
      finalize(() => {
        if (options?.activateLoading) this.massageAndLoadingService.stopLoading();
      }),
      catchError(err => {
        this.resolveMessage(err);
        throw err;
      })
    )
  }

  post<T>(url: string, body?: any | null, options?: {
    activateLoading: boolean,
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    if (options?.activateLoading) this.massageAndLoadingService.startLoading();
    return this.httpClient.post<T>(url, body, options).pipe(
      finalize(() => {
        if (options?.activateLoading) this.massageAndLoadingService.stopLoading();
      }),
      catchError(err => {
        this.resolveMessage(err);
        throw err;
      })
    )
  }

  put<T>(url: string, body: any | null, options?: {
    activateLoading: boolean,
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    if (options?.activateLoading) this.massageAndLoadingService.startLoading();
    return this.httpClient.put<T>(url, body, options).pipe(
      finalize(() => {
        if (options?.activateLoading) this.massageAndLoadingService.stopLoading();
      }),
      catchError(err => {
        this.resolveMessage(err);
        throw err;
      })
    )
  }

  patch<T>(url: string, body?: any | null, options?: {
    activateLoading: boolean,
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    if (options?.activateLoading) this.massageAndLoadingService.startLoading();
    return this.httpClient.patch<T>(url, body, options).pipe(
      finalize(() => {
        if (options?.activateLoading) this.massageAndLoadingService.stopLoading();
      }),
      catchError(err => {
        this.resolveMessage(err);
        throw err;
      })
    )
  }

  delete<T>(url: string, options?: {
    activateLoading: boolean,
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    if (options?.activateLoading) this.massageAndLoadingService.startLoading();
    return this.httpClient.delete<T>(url, options).pipe(
      finalize(() => {
        if (options?.activateLoading) this.massageAndLoadingService.stopLoading();
      }),
      catchError(err => {
        this.resolveMessage(err);
        throw err;
      })
    )
  }

  private resolveMessage = (error: HttpErrorResponse) => {
    // this.massageAndLoadingService.clearMessages();
    if (error.error["messages"] && (error.error["messages"] as Array<string>).length > 0)
      this.massageAndLoadingService.sendMessage(error.error["messages"][0]);
    else
      this.massageAndLoadingService.sendMessage(this.SERVER_NOT_RESPOND);
  }

}
