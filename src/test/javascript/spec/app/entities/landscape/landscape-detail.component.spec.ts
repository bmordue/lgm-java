/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LittleGreenMenTestModule } from '../../../test.module';
import { LandscapeDetailComponent } from 'app/entities/landscape/landscape-detail.component';
import { Landscape } from 'app/shared/model/landscape.model';

describe('Component Tests', () => {
    describe('Landscape Management Detail Component', () => {
        let comp: LandscapeDetailComponent;
        let fixture: ComponentFixture<LandscapeDetailComponent>;
        const route = ({ data: of({ landscape: new Landscape(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LittleGreenMenTestModule],
                declarations: [LandscapeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LandscapeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LandscapeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.landscape).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
