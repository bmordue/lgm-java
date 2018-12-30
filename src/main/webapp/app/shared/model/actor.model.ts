import { IGameOrder } from 'app/shared/model//game-order.model';
import { IPlayer } from 'app/shared/model//player.model';

export const enum ActorState {
    ALIVE = 'ALIVE',
    DEAD = 'DEAD'
}

export interface IActor {
    id?: number;
    state?: ActorState;
    gameOrders?: IGameOrder[];
    player?: IPlayer;
}

export class Actor implements IActor {
    constructor(public id?: number, public state?: ActorState, public gameOrders?: IGameOrder[], public player?: IPlayer) {}
}
