import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EbsRouterStateSerializer } from './state';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature("router", routerReducer),
        StoreRouterConnectingModule.forRoot({ serializer: EbsRouterStateSerializer }),
    ],
})
export class EbsRouteModule { }
