import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpClient {

  constructor(private http: Http) {}

  createContentTypeHeader(headers: Headers) {
      headers.append('Content-Type', 'application/json')
  }

  get(url) {
    let headers = new Headers();
    this.createContentTypeHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    this.createContentTypeHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }
}
