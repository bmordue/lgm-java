import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGameOrder } from 'app/shared/model/game-order.model';

@Component({
    selector: 'jhi-game-order-detail',
    templateUrl: './game-order-detail.component.html'
})
export class GameOrderDetailComponent implements OnInit {
    gameOrder: IGameOrder;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gameOrder }) => {
            this.gameOrder = gameOrder;
        });
    }

    previousState() {
        window.history.back();
    }
}
