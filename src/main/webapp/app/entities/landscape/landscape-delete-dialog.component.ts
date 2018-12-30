import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILandscape } from 'app/shared/model/landscape.model';
import { LandscapeService } from './landscape.service';

@Component({
    selector: 'jhi-landscape-delete-dialog',
    templateUrl: './landscape-delete-dialog.component.html'
})
export class LandscapeDeleteDialogComponent {
    landscape: ILandscape;

    constructor(
        protected landscapeService: LandscapeService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.landscapeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'landscapeListModification',
                content: 'Deleted an landscape'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-landscape-delete-popup',
    template: ''
})
export class LandscapeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ landscape }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LandscapeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.landscape = landscape;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
