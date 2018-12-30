import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Turn } from 'app/shared/model/turn.model';
import { TurnService } from './turn.service';
import { TurnComponent } from './turn.component';
import { TurnDetailComponent } from './turn-detail.component';
import { TurnUpdateComponent } from './turn-update.component';
import { TurnDeletePopupComponent } from './turn-delete-dialog.component';
import { ITurn } from 'app/shared/model/turn.model';

@Injectable({ providedIn: 'root' })
export class TurnResolve implements Resolve<ITurn> {
    constructor(private service: TurnService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Turn> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Turn>) => response.ok),
                map((turn: HttpResponse<Turn>) => turn.body)
            );
        }
        return of(new Turn());
    }
}

export const turnRoute: Routes = [
    {
        path: 'turn',
        component: TurnComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Turns'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'turn/:id/view',
        component: TurnDetailComponent,
        resolve: {
            turn: TurnResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Turns'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'turn/new',
        component: TurnUpdateComponent,
        resolve: {
            turn: TurnResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Turns'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'turn/:id/edit',
        component: TurnUpdateComponent,
        resolve: {
            turn: TurnResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Turns'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const turnPopupRoute: Routes = [
    {
        path: 'turn/:id/delete',
        component: TurnDeletePopupComponent,
        resolve: {
            turn: TurnResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Turns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
