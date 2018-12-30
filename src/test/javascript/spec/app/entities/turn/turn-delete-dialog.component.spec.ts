/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LittleGreenMenTestModule } from '../../../test.module';
import { TurnDeleteDialogComponent } from 'app/entities/turn/turn-delete-dialog.component';
import { TurnService } from 'app/entities/turn/turn.service';

describe('Component Tests', () => {
    describe('Turn Management Delete Component', () => {
        let comp: TurnDeleteDialogComponent;
        let fixture: ComponentFixture<TurnDeleteDialogComponent>;
        let service: TurnService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LittleGreenMenTestModule],
                declarations: [TurnDeleteDialogComponent]
            })
                .overrideTemplate(TurnDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TurnDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TurnService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
