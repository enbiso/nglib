import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { EbsRouterState } from './reducers';

export const selectFeatureRouter =
    createFeatureSelector<RouterReducerState<EbsRouterState>>('router')

export const selectRouterState = createSelector(
    selectFeatureRouter,
    router => router?.state
)

export const selectRouterUrl = createSelector(
    selectRouterState,
    router => router?.url
)

export const selectRouterParams = createSelector(
    selectRouterState,
    router => router?.params
)

export const selectRouterParamId = createSelector(
    selectRouterParams,
    params => params?.id
)

export const selectRouterPath = createSelector(
    selectRouterState,
    params => params?.path
)

export const selectRouterPathStartWith = (pathPrefix: string) => createSelector(
    selectRouterPath,
    (path: string) => path.startsWith(pathPrefix)
)

export const selectRouterPathIn = (paths: string[]) => createSelector(
    selectRouterPath,
    (path: string) => paths.indexOf(path) >= 0
)

export const selectRouterPathNotIn = (paths: string[]) => createSelector(
    selectRouterPath,
    (path: string) => paths.indexOf(path) < 0
)

export const selectRouterQueryParams = createSelector(
    selectRouterState,
    router => router?.queryParams
)