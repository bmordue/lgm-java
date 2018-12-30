import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGameOrder } from 'app/shared/model/game-order.model';

type EntityResponseType = HttpResponse<IGameOrder>;
type EntityArrayResponseType = HttpResponse<IGameOrder[]>;

@Injectable({ providedIn: 'root' })
export class GameOrderService {
    public resourceUrl = SERVER_API_URL + 'api/game-orders';

    constructor(protected http: HttpClient) {}

    create(gameOrder: IGameOrder): Observable<EntityResponseType> {
        return this.http.post<IGameOrder>(this.resourceUrl, gameOrder, { observe: 'response' });
    }

    update(gameOrder: IGameOrder): Observable<EntityResponseType> {
        return this.http.put<IGameOrder>(this.resourceUrl, gameOrder, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGameOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGameOrder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
