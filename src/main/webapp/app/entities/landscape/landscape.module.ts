import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LittleGreenMenSharedModule } from 'app/shared';
import {
    LandscapeComponent,
    LandscapeDetailComponent,
    LandscapeUpdateComponent,
    LandscapeDeletePopupComponent,
    LandscapeDeleteDialogComponent,
    landscapeRoute,
    landscapePopupRoute
} from './';

const ENTITY_STATES = [...landscapeRoute, ...landscapePopupRoute];

@NgModule({
    imports: [LittleGreenMenSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LandscapeComponent,
        LandscapeDetailComponent,
        LandscapeUpdateComponent,
        LandscapeDeleteDialogComponent,
        LandscapeDeletePopupComponent
    ],
    entryComponents: [LandscapeComponent, LandscapeUpdateComponent, LandscapeDeleteDialogComponent, LandscapeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LittleGreenMenLandscapeModule {}
