import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { authActions } from './actions';
import { tap, mergeMap, map, catchError, filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { filterWithLatestFrom } from '@enbiso/rxjs-operators';
import { Store } from '@ngrx/store';
import { selectRouterPathIn } from '@enbiso/ngrx-route';

@Injectable()
export class AuthEffects {

    private static REDIRECT_URL = 'ebs.auth.redirectUrl'

    signIn$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.signIn),
        mergeMap(() => this.authService.getUser()),
        tap(user => {
            if (!user || user.expired) {
                sessionStorage.setItem(AuthEffects.REDIRECT_URL, location.pathname + location.search)
                this.authService.startSignIn()
            }
        }),
        filter(user => user != null && !user.expired),
        map(user => authActions.signInSuccess({ user: user }))
    ))

    signOut$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.signOut),
        tap(_ => this.authService.startSignOut())
    ), { dispatch: false })

    signInComplete$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.signInComplete),
        mergeMap(() => this.authService.completeSignIn()),
        map(user => authActions.signInSuccess({ user: user })),
        catchError((err) => of(authActions.signInFail({ error: err.message })))
    ))

    signInSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.signInSuccess),
        tap(() => {
            const currentUrl = sessionStorage.getItem(AuthEffects.REDIRECT_URL)
            sessionStorage.removeItem(AuthEffects.REDIRECT_URL)
            if (currentUrl) this.router.navigateByUrl(currentUrl);
        })
    ), { dispatch: false })

    refreshStart$ = createEffect(() => this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        filterWithLatestFrom(this.store.select(selectRouterPathIn([
            "/refresh-callback",
        ]))),
        map(() => authActions.refreshComplete()),
        tap(() => console.log("Token refreshing...")),
    ))

    refreshComplete$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.refreshComplete),
        mergeMap(() => this.authService.completeRefresh()),
        map(user => authActions.refreshSuccess({ user: user })),
        catchError((err) => of(authActions.refreshFail({ error: err.message })))
    ))

    signOutComplete$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.signOutComplete),
        mergeMap(() => this.authService.completeSignOut()),
        map(() => authActions.signOutSuccess()),
        catchError((err) => of(authActions.signOutFail({ error: err.message })))
    ))

    constructor(
        private store: Store,
        private router: Router,
        private authService: AuthService,
        private actions$: Actions
    ) { }
}