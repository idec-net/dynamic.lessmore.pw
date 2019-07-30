import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { url, Search, ESResponse } from './search';
import { Echo, EchoHash } from './echo';

import { Post } from './post';

import { Base64 } from 'js-base64';

import { NgForm } from '@angular/forms';

@Injectable()
export class PostService {
    settings = {
        offset: 0,
        size: 10
    };

    public posts: Array<any> = [];
    public popup: Array<any> = [];
    echoes = [];

    latestPots: string = `{"sort": [{"date": {"order": "desc"}}, {"_score": {"order": "desc" }}], "size": 10}`;
    echoSearch: string = `{"sort": [{ "date":   { "order": "desc" }}, { "_score": { "order": "desc" }}],"aggs": {"my_fields": {  "terms": { "field": "echo","size": 1000}}}}}`;
    offsetRequest: string;

    // ucs-2 string to base64 encoded ascii
    utoa(str: string) {
        return btoa(encodeURIComponent(str));
    }
    // base64 encoded ascii to ucs-2 string
    atou(str: string) {
        return decodeURIComponent(atob(str));
    }

    makeIdecNewMessage(form: NgForm): string {
        let message = [];
        message.push(form.value.echoInput);
        message.push("All");
        message.push(form.value.subgInput);
        message.push("");
        message.push("");
        message.push(form.value.msgInput);
        return encodeURIComponent(Base64.encode(message.join("\n")));
    }

    makeIdecReptoMessage(form: NgForm, post: Post): string {
        let message = [];
        message.push(form.value.echoInput);
        message.push(post.author);
        message.push(form.value.subgInput);
        message.push("");
        message.push("@repto:" + post.msgid);
        message.push(form.value.msgInput);
        return encodeURIComponent(Base64.encode(message.join("\n")));
    }

    makeReplySubg(subg: string): string {
        if (subg.startsWith("Re:")) {
            return subg;
        } else {
            return "Re: " + subg;
        }
    }

    postMessage(data: string): Observable<string> {
        return this.http.post<string>("/idec/u/point", data);
    }

    getThreadPosts(id: string): Observable<ESResponse> {
        let request: string = `{"sort": [{"date": {"order": "asc"}},
{"_score": {"order": "desc" }}], "size": 100, "query": {"term": {"topicid.keyword": "` + id + `"}}}`;
        return this.http.post<ESResponse>(url, request);
    }

    offsetEchoRequestString(order: string): string {
        return '{"sort": [{"date": {"order": "' + order + '"}}, {"_score": { "order": "desc" }}], "query": {"query_string" : {"fields": ["echo"], "query": "' + this.echoesList() + '"}}, "size":' + this.settings.size + ', "from":' + this.settings.offset + '}'
    }

    offsetSingleEchoRequestString(echo: string, order: string): string {
        return '{"sort": [{"date": {"order": "' + order + '"}}, {"_score": { "order": "desc" }}], "query": {"query_string" : {"fields": ["echo"], "query": "' + echo + '"}}, "size":' + this.settings.size + ', "from":' + this.settings.offset + '}';
    }

    getPosts(): Observable<ESResponse> {
        return this.http.post<ESResponse>(url, this.latestPots);
    }

    getPostsOffset(): Observable<ESResponse> {
        if (this.echoesList() == "") {
            this.offsetRequest = '{"sort": [ { "date":   { "order": "desc" }}, { "_score": { "order": "desc" }}],"size":'
                + this.settings.size + ', "from":' + this.settings.offset + '}';
        } else {
            this.offsetRequest = this.offsetEchoRequestString("desc")
        }
        return this.http.post<ESResponse>(url, this.offsetRequest);
    }

    getSingleEcho(echo: string, order: string): Observable<ESResponse> {
        return this.http.post<ESResponse>(url, this.offsetSingleEchoRequestString(echo, order));
    }

    getEchoPosts(): Observable<ESResponse> {
        console.log("Echolist: " + this.echoesList());
        return this.http.post<ESResponse>(url, this.searchString());
    }

    getMessageByID(id: string): Observable<ESResponse> {
        console.log("Echolist: " + this.echoesList());
        return this.http.post<ESResponse>(url, this.messageIDString(id));
    }

    // Find the thread starting message
    // findTopID(msg: Post): string {
    //     if (msg.repto === "" || msg.id === null) {
    //         // Already top message
    //         return msg.id;
    //     } else {
    //         // Find message
    //         reptoMessage = this.makeSingleMessage(this.getMessageByID(msg.repto));
    //         if (reptoMessage.repto != "" && reptoMessage.id != null) {
    //             return this.findTopID(reptoMessage);
    //         } else {
    //             return msg.id;
    //         }
    //     }
    //     return "";
    // }

    // makeSingleMessage(m: ESResponse): Post {
    //     // TODO: write it
    // }

    searchString(): string {
        if (this.echoesList() == "") {
            return this.latestPots;
        }
        return '{"sort": [{"date": {"order": "desc"}}, {"_score": { "order": "desc" }}], "query": {"query_string" : {"fields": ["echo"], "query": "' + this.echoesList() + '"}}, "size":' + "10" + '}';
    }

    messageIDString(id: string): string {
        return '{"sort": [ { "date":   { "order": "desc" }}, { "_score": { "order": "desc" }}], "query": {"query_string" : {"fields" : ["msgid"], "query" :"' + id + '"}}, "size": 1 }';
    }

    echoesList(): string {
        this.echoes = [];
        for (let key in JSON.parse(localStorage.getItem("selectedEcho"))) {
            this.echoes.push(key);
        }
        return this.echoes.join(" ");
    }

    constructor(
        private http: HttpClient
    ) { }

}
