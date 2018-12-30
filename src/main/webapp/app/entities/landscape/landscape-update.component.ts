import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILandscape } from 'app/shared/model/landscape.model';
import { LandscapeService } from './landscape.service';
import { ITurn } from 'app/shared/model/turn.model';
import { TurnService } from 'app/entities/turn';

@Component({
    selector: 'jhi-landscape-update',
    templateUrl: './landscape-update.component.html'
})
export class LandscapeUpdateComponent implements OnInit {
    landscape: ILandscape;
    isSaving: boolean;

    turns: ITurn[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected landscapeService: LandscapeService,
        protected turnService: TurnService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ landscape }) => {
            this.landscape = landscape;
        });
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
        if (this.landscape.id !== undefined) {
            this.subscribeToSaveResponse(this.landscapeService.update(this.landscape));
        } else {
            this.subscribeToSaveResponse(this.landscapeService.create(this.landscape));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILandscape>>) {
        result.subscribe((res: HttpResponse<ILandscape>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTurnById(index: number, item: ITurn) {
        return item.id;
    }
}
