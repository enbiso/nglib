import { Inject, Injectable, InjectionToken } from '@angular/core';
import { UserManager, UserManagerSettings, User, SignoutResponse } from 'oidc-client';
import { from, Observable } from 'rxjs';
import { AbsoluteUri, BaseUri } from '@enbiso/utils-url';
import { map } from 'rxjs/operators';

export const EBS_AUTH_OIDC_OPTIONS = new InjectionToken("OIDC Options");

/**
 * Auth service
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(@Inject(EBS_AUTH_OIDC_OPTIONS) oidcOptions: any) {
        const settings: UserManagerSettings = Object.assign(oidcOptions, <UserManagerSettings>{
            redirect_uri: AbsoluteUri('auth-callback'),
            post_logout_redirect_uri: BaseUri(),
            filterProtocolClaims: true,
            loadUserInfo: true,
            automaticSilentRenew: true,
            silent_redirect_uri: AbsoluteUri('refresh-callback')
        });
        this.manager = new UserManager(settings);
    }

    private manager: UserManager

    /**
     * Get User
     */
    getUser(): Observable<User | null> {
        return from(this.manager.getUser())
    }

    /**
     * In Role
     */
    inRole(role: string): Observable<boolean> {
        return this.getUser().pipe(
            map(u => u?.profile?.role || []),
            map(roles => roles instanceof Array ? roles : [roles]),
            map(roles => roles.indexOf(role) >= 0)
        )
    }

    /**
     * Start authentication
     */
    startSignIn(): Observable<void> {
        return from(this.manager.signinRedirect())
    }

    /**
     * Complete authentication
     */
    completeSignIn(): Observable<User> {
        return from(this.manager.signinRedirectCallback())
    }


    /**
     * Complete Refresh
     */
    completeRefresh(): Observable<User | null> {
        return from(this.manager.signinSilentCallback()).pipe(map(user => user || null))
    }

    /**
     * Start logout
     */
    startSignOut(): Observable<void> {
        return from(this.manager.signoutRedirect())
    }

    /**
     * Complete logout
     */
    completeSignOut(): Observable<SignoutResponse> {
        return from(this.manager.signoutRedirectCallback())
    }
}