import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Echo } from './echo';
import { Search, ESResponse } from './search';

@Injectable()
export class EchoService {
    selectedEcho;
    echoesList = [];
    
    search: Search = {
        Url: "/search"
    }

    data: string = `{"sort": [{ "date":   { "order": "desc" }}, { "_score": { "order": "desc" }}],"aggs": {"my_fields": {  "terms": { "field": "echo","size": 1000}}}}}`;

    getEchoes(): Observable<ESResponse> {
        return this.http.post<ESResponse>(this.search.Url, this.data);
    }

    selectedEchoesList(): any {
        this.echoesList = [];
        for (let key in JSON.parse(localStorage.getItem("selectedEcho"))) {
            this.echoesList.push(JSON.parse(localStorage.getItem("selectedEcho"))[key]);
        }
        return this.echoesList;
    }

    constructor(
        private http: HttpClient,
    ) {
        this.selectedEcho = {};
    }

}
