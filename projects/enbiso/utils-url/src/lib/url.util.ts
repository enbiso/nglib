/**
 * Get the Base URI
 */
export function BaseUri() {
    return location.protocol + '//' + location.host;
}
/**
 * get the absolute URI of the given path
 * @param path 
 */
export function AbsoluteUri(path: string) {
    return BaseUri() + '/' + path
}