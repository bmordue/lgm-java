/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LittleGreenMenTestModule } from '../../../test.module';
import { GameOrderDetailComponent } from 'app/entities/game-order/game-order-detail.component';
import { GameOrder } from 'app/shared/model/game-order.model';

describe('Component Tests', () => {
    describe('GameOrder Management Detail Component', () => {
        let comp: GameOrderDetailComponent;
        let fixture: ComponentFixture<GameOrderDetailComponent>;
        const route = ({ data: of({ gameOrder: new GameOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LittleGreenMenTestModule],
                declarations: [GameOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GameOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GameOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gameOrder).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
