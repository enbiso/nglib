import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, mergeMap, catchError, filter } from 'rxjs/operators';
import { Injectable, Injector, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthHeader } from '@enbiso/auth';

/**
 * Core HTTP error handler
 */
export interface CoreHttpErrorHandler {
    handle(err: HttpErrorResponse): void
}

/**
 * Core HTTP error handler token
 */
export const EBS_REST_CLIENT_HTTP_ERROR_HANDLER = new InjectionToken<CoreHttpErrorHandler[]>('EBS_REST_CLIENT_HTTP_ERROR_HANDLER')

/**
 * HTTP service
 */
@Injectable({ providedIn: "root" })
export class HttpService {
    errorHandlers: CoreHttpErrorHandler[]
    authHeader$: Observable<string | null>

    constructor(
        private http: HttpClient,
        store: Store,
        injector: Injector
    ) {
        this.errorHandlers = injector.get(EBS_REST_CLIENT_HTTP_ERROR_HANDLER, [])
        this.authHeader$ = store.select(selectAuthHeader)
    }

    /**
     * POST request
     * @param resource Resource URI
     * @param data POST data
     */
    public post<M>(resource: string, data: any, opts?: HttpOptions): Observable<M> {
        return this._options(opts).pipe(mergeMap(opts =>
            this.http.post<M>(resource, data, opts)
                .pipe(catchError((err: HttpErrorResponse) => throwError(err)))
                .pipe(catchError(err => this._errorHandler(err)))))
    }

    /**
     * PUT request
     * @param resource Resource URI
     * @param data PUT data
     */
    public put<M>(resource: string, data: any, opts?: HttpOptions): Observable<M> {
        return this._options(opts).pipe(mergeMap(opts =>
            this.http.put<M>(resource, data, opts)
                .pipe(catchError((err: HttpErrorResponse) => throwError(err)))
                .pipe(catchError(err => this._errorHandler(err)))))
    }

    /**
     * PATCH request
     * @param resource Resource URI
     */
    public patch<M>(resource: string, data: any, opts?: HttpOptions): Observable<M> {
        return this._options(opts).pipe(mergeMap(opts =>
            this.http.patch<M>(resource, data, opts)
                .pipe(catchError((err: HttpErrorResponse) => throwError(err)))
                .pipe(catchError(err => this._errorHandler(err)))))
    }

    /**
     * DELETE request
     * @param resource Resource URI
     */
    public delete<M>(resource: string, opts?: HttpOptions): Observable<M> {
        return this._options(opts).pipe(mergeMap(opts =>
            this.http.delete<M>(resource, opts)
                .pipe(catchError((err: HttpErrorResponse) => throwError(err)))
                .pipe(catchError(err => this._errorHandler(err)))))
    }

    /**
     * GET request
     * @param resource ResourceURI
     * @param params URL params
     */
    public get<M>(resource: string, opts?: HttpOptions): Observable<M> {
        return this._options(opts).pipe(mergeMap(opts =>
            this.http.get<M>(resource, opts)
                .pipe(catchError((err: HttpErrorResponse) => throwError(err)))
                .pipe(catchError(err => this._errorHandler(err)))))
    }

    /**
     * 
     * @param err Http
     */
    _errorHandler(err: HttpErrorResponse): Observable<never> {
        this.errorHandlers && this.errorHandlers.map(h => h.handle(err))
        return throwError(err)
    }

    /**
     * Get options based on setup opts
     * @param opts setup opts
     */
    private _options(inputOpts?: HttpOptions): Observable<HttpOptions> {
        const opts = inputOpts || {}
        return this.authHeader$.pipe(
            filter(token => token != null),
            map(token => {
                opts.headers = opts.headers || {};
                (opts.headers as any)["Accept"] = (opts.headers as any)["Accept"] || "application/json";
                (opts.headers as any)["Content-Type"] = (opts.headers as any)["Content-Type"] || "application/json";
                if (token) (opts.headers as any)["Authorization"] = token;
                return opts
            }))
    }
}

export interface HttpOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: any;
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}
