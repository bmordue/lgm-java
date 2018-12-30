import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LittleGreenMenGameModule } from './game/game.module';
import { LittleGreenMenTurnModule } from './turn/turn.module';
import { LittleGreenMenPlayerModule } from './player/player.module';
import { LittleGreenMenActorModule } from './actor/actor.module';
import { LittleGreenMenLandscapeModule } from './landscape/landscape.module';
import { LittleGreenMenGameOrderModule } from './game-order/game-order.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        LittleGreenMenGameModule,
        LittleGreenMenTurnModule,
        LittleGreenMenPlayerModule,
        LittleGreenMenActorModule,
        LittleGreenMenLandscapeModule,
        LittleGreenMenGameOrderModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LittleGreenMenEntityModule {}
