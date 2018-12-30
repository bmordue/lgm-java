import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LittleGreenMenSharedModule } from 'app/shared';
import {
    TurnComponent,
    TurnDetailComponent,
    TurnUpdateComponent,
    TurnDeletePopupComponent,
    TurnDeleteDialogComponent,
    turnRoute,
    turnPopupRoute
} from './';

const ENTITY_STATES = [...turnRoute, ...turnPopupRoute];

@NgModule({
    imports: [LittleGreenMenSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TurnComponent, TurnDetailComponent, TurnUpdateComponent, TurnDeleteDialogComponent, TurnDeletePopupComponent],
    entryComponents: [TurnComponent, TurnUpdateComponent, TurnDeleteDialogComponent, TurnDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LittleGreenMenTurnModule {}
