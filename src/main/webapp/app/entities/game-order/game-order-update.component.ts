import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGameOrder } from 'app/shared/model/game-order.model';
import { GameOrderService } from './game-order.service';
import { IActor } from 'app/shared/model/actor.model';
import { ActorService } from 'app/entities/actor';
import { ITurn } from 'app/shared/model/turn.model';
import { TurnService } from 'app/entities/turn';

@Component({
    selector: 'jhi-game-order-update',
    templateUrl: './game-order-update.component.html'
})
export class GameOrderUpdateComponent implements OnInit {
    gameOrder: IGameOrder;
    isSaving: boolean;

    actors: IActor[];

    turns: ITurn[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected gameOrderService: GameOrderService,
        protected actorService: ActorService,
        protected turnService: TurnService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gameOrder }) => {
            this.gameOrder = gameOrder;
        });
        this.actorService.query().subscribe(
            (res: HttpResponse<IActor[]>) => {
                this.actors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.turnService.query().subscribe(
            (res: HttpResponse<ITurn[]>) => {
                this.turns = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gameOrder.id !== undefined) {
            this.subscribeToSaveResponse(this.gameOrderService.update(this.gameOrder));
        } else {
            this.subscribeToSaveResponse(this.gameOrderService.create(this.gameOrder));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IGameOrder>>) {
        result.subscribe((res: HttpResponse<IGameOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackActorById(index: number, item: IActor) {
        return item.id;
    }

    trackTurnById(index: number, item: ITurn) {
        return item.id;
    }
}
