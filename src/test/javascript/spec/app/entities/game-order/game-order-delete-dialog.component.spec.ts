/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LittleGreenMenTestModule } from '../../../test.module';
import { GameOrderDeleteDialogComponent } from 'app/entities/game-order/game-order-delete-dialog.component';
import { GameOrderService } from 'app/entities/game-order/game-order.service';

describe('Component Tests', () => {
    describe('GameOrder Management Delete Component', () => {
        let comp: GameOrderDeleteDialogComponent;
        let fixture: ComponentFixture<GameOrderDeleteDialogComponent>;
        let service: GameOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LittleGreenMenTestModule],
                declarations: [GameOrderDeleteDialogComponent]
            })
                .overrideTemplate(GameOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GameOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameOrderService);
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
