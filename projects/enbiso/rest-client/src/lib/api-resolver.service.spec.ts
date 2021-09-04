import { ApiResolverService } from './api-resolver.service'

describe("API Resolver", () => {
    it("#ResourceUri should return api link with service path", () => {
        const apiResolver = new ApiResolverService({
            server: "http://testapi.com/v1/",
            services: { test: "testapi/" }
        })
        var url = apiResolver.resourceUri("test", "clients");
        expect(url).toEqual("http://testapi.com/v1/testapi/clients");
    });

    it("#ResourceUri should return api link with full service path", () => {
        const apiResolver = new ApiResolverService({
            server: "http://testapi.com/v1/",
            services: { test: "http://exampleapi.com/" }
        })
        var url = apiResolver.resourceUri("test", "clients");
        expect(url).toEqual("http://exampleapi.com/clients");
    });
});