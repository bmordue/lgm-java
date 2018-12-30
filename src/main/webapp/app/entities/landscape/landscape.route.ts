import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Landscape } from 'app/shared/model/landscape.model';
import { LandscapeService } from './landscape.service';
import { LandscapeComponent } from './landscape.component';
import { LandscapeDetailComponent } from './landscape-detail.component';
import { LandscapeUpdateComponent } from './landscape-update.component';
import { LandscapeDeletePopupComponent } from './landscape-delete-dialog.component';
import { ILandscape } from 'app/shared/model/landscape.model';

@Injectable({ providedIn: 'root' })
export class LandscapeResolve implements Resolve<ILandscape> {
    constructor(private service: LandscapeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Landscape> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Landscape>) => response.ok),
                map((landscape: HttpResponse<Landscape>) => landscape.body)
            );
        }
        return of(new Landscape());
    }
}

export const landscapeRoute: Routes = [
    {
        path: 'landscape',
        component: LandscapeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Landscapes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'landscape/:id/view',
        component: LandscapeDetailComponent,
        resolve: {
            landscape: LandscapeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Landscapes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'landscape/new',
        component: LandscapeUpdateComponent,
        resolve: {
            landscape: LandscapeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Landscapes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'landscape/:id/edit',
        component: LandscapeUpdateComponent,
        resolve: {
            landscape: LandscapeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Landscapes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const landscapePopupRoute: Routes = [
    {
        path: 'landscape/:id/delete',
        component: LandscapeDeletePopupComponent,
        resolve: {
            landscape: LandscapeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Landscapes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
