/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LittleGreenMenTestModule } from '../../../test.module';
import { LandscapeUpdateComponent } from 'app/entities/landscape/landscape-update.component';
import { LandscapeService } from 'app/entities/landscape/landscape.service';
import { Landscape } from 'app/shared/model/landscape.model';

describe('Component Tests', () => {
    describe('Landscape Management Update Component', () => {
        let comp: LandscapeUpdateComponent;
        let fixture: ComponentFixture<LandscapeUpdateComponent>;
        let service: LandscapeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LittleGreenMenTestModule],
                declarations: [LandscapeUpdateComponent]
            })
                .overrideTemplate(LandscapeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LandscapeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LandscapeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Landscape(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.landscape = entity;
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
                    const entity = new Landscape();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.landscape = entity;
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
