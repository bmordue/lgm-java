import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GameOrder } from 'app/shared/model/game-order.model';
import { GameOrderService } from './game-order.service';
import { GameOrderComponent } from './game-order.component';
import { GameOrderDetailComponent } from './game-order-detail.component';
import { GameOrderUpdateComponent } from './game-order-update.component';
import { GameOrderDeletePopupComponent } from './game-order-delete-dialog.component';
import { IGameOrder } from 'app/shared/model/game-order.model';

@Injectable({ providedIn: 'root' })
export class GameOrderResolve implements Resolve<IGameOrder> {
    constructor(private service: GameOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GameOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GameOrder>) => response.ok),
                map((gameOrder: HttpResponse<GameOrder>) => gameOrder.body)
            );
        }
        return of(new GameOrder());
    }
}

export const gameOrderRoute: Routes = [
    {
        path: 'game-order',
        component: GameOrderComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'GameOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'game-order/:id/view',
        component: GameOrderDetailComponent,
        resolve: {
            gameOrder: GameOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GameOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'game-order/new',
        component: GameOrderUpdateComponent,
        resolve: {
            gameOrder: GameOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GameOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'game-order/:id/edit',
        component: GameOrderUpdateComponent,
        resolve: {
            gameOrder: GameOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GameOrders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gameOrderPopupRoute: Routes = [
    {
        path: 'game-order/:id/delete',
        component: GameOrderDeletePopupComponent,
        resolve: {
            gameOrder: GameOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GameOrders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
