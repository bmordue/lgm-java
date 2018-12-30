import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILandscape } from 'app/shared/model/landscape.model';

@Component({
    selector: 'jhi-landscape-detail',
    templateUrl: './landscape-detail.component.html'
})
export class LandscapeDetailComponent implements OnInit {
    landscape: ILandscape;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ landscape }) => {
            this.landscape = landscape;
        });
    }

    previousState() {
        window.history.back();
    }
}
