import { RouterStateSerializer } from '@ngrx/router-store'
import { RouterStateSnapshot, ActivatedRouteSnapshot, Params } from '@angular/router'
import { EbsRouterState } from './reducers'

export class EbsRouterStateSerializer implements RouterStateSerializer<EbsRouterState> {
    serialize(routerState: RouterStateSnapshot): EbsRouterState {
        const { url } = routerState
        const { queryParams } = routerState.root
        let state: ActivatedRouteSnapshot = routerState.root
        let path = state?.routeConfig?.path || ""
        let params: Params = {}
        while (state.firstChild) {
            state = state.firstChild
            const postfix = state?.routeConfig?.path
            path += postfix != '' && `/${postfix}` || ''
            params = Object.assign(params, state.params)
        }
        return { url, queryParams, params, path }
    }
}