import { customFetch, OpenSRPService } from '@opensrp/server-service';

/** allowed http methods */
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface Payload {
    headers: HeadersInit;
    method: HTTPMethod;
}

export const defaultErrorCallback = () => {
    return;
};

/** custom function that logs user from both a keycloak authorization server
 * and the opensrp server
 * @param payload - payload to add to the fetch request
 * @param openSRPLogoutUri - url to logout from opensrp
 * @param keycloakLogoutUri - url to logout from keycloak
 * @param redirectUri - uri to redirect to after logout
 * - its attached to the keycloak logout uri as a searchParam with key redirect_uri
 */
export const logout = async (
    payload: Payload,
    opensrpLogoutUri: string,
    keycloakLogoutUri: string,
    redirectUri: string,
) => {
    const filterParams = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        redirect_uri: redirectUri,
    };
    const fullKeycloakLogoutUri = OpenSRPService.getURL(keycloakLogoutUri, filterParams);
    await customFetch(opensrpLogoutUri, payload)
        .then(() => {
            window.location.href = fullKeycloakLogoutUri;
        })
        .catch(error => {
            throw error;
        });
    return null;
};
