import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILandscape } from 'app/shared/model/landscape.model';

type EntityResponseType = HttpResponse<ILandscape>;
type EntityArrayResponseType = HttpResponse<ILandscape[]>;

@Injectable({ providedIn: 'root' })
export class LandscapeService {
    public resourceUrl = SERVER_API_URL + 'api/landscapes';

    constructor(protected http: HttpClient) {}

    create(landscape: ILandscape): Observable<EntityResponseType> {
        return this.http.post<ILandscape>(this.resourceUrl, landscape, { observe: 'response' });
    }

    update(landscape: ILandscape): Observable<EntityResponseType> {
        return this.http.put<ILandscape>(this.resourceUrl, landscape, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILandscape>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILandscape[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
