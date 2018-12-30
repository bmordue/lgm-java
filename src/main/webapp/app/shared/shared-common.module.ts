import { NgModule } from '@angular/core';

import { LittleGreenMenSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [LittleGreenMenSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [LittleGreenMenSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class LittleGreenMenSharedCommonModule {}
