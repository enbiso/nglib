import { Inject, Injectable, InjectionToken } from '@angular/core';

export const EBS_REST_CLIENT_API_OPTIONS = new InjectionToken("API Options");

export interface ApiOptions {
    server: string,
    services: { [name: string]: string }
}

@Injectable({ providedIn: 'root' })
export class ApiResolverService {
    constructor(@Inject(EBS_REST_CLIENT_API_OPTIONS) private apiOptions: ApiOptions) { }

    /**
     * Get resource URL
     * @param serviceName Service name
     * @param resourceName Resource name
     */
    resourceUri(serviceName: string, resourceName: string) {
        let service = this.serviceUri(serviceName);
        return `${service}${resourceName}/`;
    }
    /**
     * Get service URL
     * @param serviceName Service name
     */
    serviceUri(serviceName: string) {
        let service = this.apiOptions.services[serviceName] as string;
        if (!service) throw `Service ${serviceName} not defined in environment`;
        return (service.startsWith("http") ? service : this.apiOptions.server + service);
    }
}