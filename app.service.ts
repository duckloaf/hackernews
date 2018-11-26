import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

/*
 * A JWT (json web token) is used for authorisation. The API endpoint is expecting the token to be sent
 * in an Austhorisation header for each request. Any request not containing this header is automatically
 * rejected.
 */

export class CustomersService {
    constructor(
        private http: HttpClient,
    ) { }

    getArticles(query, page): Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'text/html' });
        headers.append('Access-Control-Allow-Origin','*');
        let options = { headers: headers };
        return this.http.get('http://52.62.237.183:3001/articles/'+query+'/'+page, options)
        .pipe(
            //tap( data => console.log(data), error => console.error(error) ),
            catchError(this.handleError),
        );
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error.message);
        return Promise.reject(error.message || error);
    }
 
}