import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LittleGreenMenSharedModule } from 'app/shared';
import {
    GameOrderComponent,
    GameOrderDetailComponent,
    GameOrderUpdateComponent,
    GameOrderDeletePopupComponent,
    GameOrderDeleteDialogComponent,
    gameOrderRoute,
    gameOrderPopupRoute
} from './';

const ENTITY_STATES = [...gameOrderRoute, ...gameOrderPopupRoute];

@NgModule({
    imports: [LittleGreenMenSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GameOrderComponent,
        GameOrderDetailComponent,
        GameOrderUpdateComponent,
        GameOrderDeleteDialogComponent,
        GameOrderDeletePopupComponent
    ],
    entryComponents: [GameOrderComponent, GameOrderUpdateComponent, GameOrderDeleteDialogComponent, GameOrderDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LittleGreenMenGameOrderModule {}
