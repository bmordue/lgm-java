import { ILandscape } from 'app/shared/model//landscape.model';
import { IGameOrder } from 'app/shared/model//game-order.model';
import { IGame } from 'app/shared/model//game.model';

export interface ITurn {
    id?: number;
    number?: number;
    landscape?: ILandscape;
    gameOrders?: IGameOrder[];
    game?: IGame;
}

export class Turn implements ITurn {
    constructor(
        public id?: number,
        public number?: number,
        public landscape?: ILandscape,
        public gameOrders?: IGameOrder[],
        public game?: IGame
    ) {}
}
