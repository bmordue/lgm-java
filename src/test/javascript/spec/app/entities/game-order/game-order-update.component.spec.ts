/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LittleGreenMenTestModule } from '../../../test.module';
import { GameOrderUpdateComponent } from 'app/entities/game-order/game-order-update.component';
import { GameOrderService } from 'app/entities/game-order/game-order.service';
import { GameOrder } from 'app/shared/model/game-order.model';

describe('Component Tests', () => {
    describe('GameOrder Management Update Component', () => {
        let comp: GameOrderUpdateComponent;
        let fixture: ComponentFixture<GameOrderUpdateComponent>;
        let service: GameOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LittleGreenMenTestModule],
                declarations: [GameOrderUpdateComponent]
            })
                .overrideTemplate(GameOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GameOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameOrderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new GameOrder(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.gameOrder = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new GameOrder();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.gameOrder = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
