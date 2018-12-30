import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITurn } from 'app/shared/model/turn.model';

type EntityResponseType = HttpResponse<ITurn>;
type EntityArrayResponseType = HttpResponse<ITurn[]>;

@Injectable({ providedIn: 'root' })
export class TurnService {
    public resourceUrl = SERVER_API_URL + 'api/turns';

    constructor(protected http: HttpClient) {}

    create(turn: ITurn): Observable<EntityResponseType> {
        return this.http.post<ITurn>(this.resourceUrl, turn, { observe: 'response' });
    }

    update(turn: ITurn): Observable<EntityResponseType> {
        return this.http.put<ITurn>(this.resourceUrl, turn, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITurn>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITurn[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
