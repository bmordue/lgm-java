import { IActor } from 'app/shared/model//actor.model';
import { ITurn } from 'app/shared/model//turn.model';

export const enum Direction {
    UP_LEFT = 'UP_LEFT',
    UP_RIGHT = 'UP_RIGHT',
    RIGHT = 'RIGHT',
    DOWN_RIGHT = 'DOWN_RIGHT',
    DOWN_LEFT = 'DOWN_LEFT',
    LEFT = 'LEFT',
    CENTRE = 'CENTRE'
}

export interface IGameOrder {
    id?: number;
    direction?: Direction;
    actor?: IActor;
    turn?: ITurn;
}

export class GameOrder implements IGameOrder {
    constructor(public id?: number, public direction?: Direction, public actor?: IActor, public turn?: ITurn) {}
}
