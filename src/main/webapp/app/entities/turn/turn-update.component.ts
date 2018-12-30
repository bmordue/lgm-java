import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITurn } from 'app/shared/model/turn.model';
import { TurnService } from './turn.service';
import { ILandscape } from 'app/shared/model/landscape.model';
import { LandscapeService } from 'app/entities/landscape';
import { IGame } from 'app/shared/model/game.model';
import { GameService } from 'app/entities/game';

@Component({
    selector: 'jhi-turn-update',
    templateUrl: './turn-update.component.html'
})
export class TurnUpdateComponent implements OnInit {
    turn: ITurn;
    isSaving: boolean;

    landscapes: ILandscape[];

    games: IGame[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected turnService: TurnService,
        protected landscapeService: LandscapeService,
        protected gameService: GameService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ turn }) => {
            this.turn = turn;
        });
        this.landscapeService.query({ filter: 'turn-is-null' }).subscribe(
            (res: HttpResponse<ILandscape[]>) => {
                if (!this.turn.landscape || !this.turn.landscape.id) {
                    this.landscapes = res.body;
                } else {
                    this.landscapeService.find(this.turn.landscape.id).subscribe(
                        (subRes: HttpResponse<ILandscape>) => {
                            this.landscapes = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.gameService.query().subscribe(
            (res: HttpResponse<IGame[]>) => {
                this.games = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.turn.id !== undefined) {
            this.subscribeToSaveResponse(this.turnService.update(this.turn));
        } else {
            this.subscribeToSaveResponse(this.turnService.create(this.turn));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITurn>>) {
        result.subscribe((res: HttpResponse<ITurn>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLandscapeById(index: number, item: ILandscape) {
        return item.id;
    }

    trackGameById(index: number, item: IGame) {
        return item.id;
    }
}
