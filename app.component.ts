import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { CustomersService } from './app.service';
import { DateFormatter } from './date-formatter';
import { Article } from './classes/article';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    constructor(
        public api: CustomersService,
        private df: DateFormatter,
    ) {
        this.filter.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(result => this.doSearch(result));
    }

    articles: Article[] = [];
    currentPage: number = 1;
    totalPages: number;
    startPage: number;
    endPage: number;
    pages: number[] = [];
    loading: boolean;
    filter = new BehaviorSubject<string>('');

    ngOnInit() {
        //this.getArticles("trickery", 0);
    }

    // --- UI FUNCTIONS --- //
    getPage(page: number) {
        this.currentPage = page;
        this.getArticles(this.filter.getValue(), page - 1);
    }

    getLocalTime(zulu: string): string {
        return String(this.df.getLocal('ddth MM yyyy', zulu));
    }

    getArticleColour(article): string {
        if(article.points > 150) {
            return 'success';
        } else if(article.points >= 100 && article.points < 150) {
            return 'info';
        } else {
            return 'warning';
        }
    }

    calculatePaging() {
        // ensure current page isn't out of range
        if (this.currentPage < 1) { 
            this.currentPage = 1; 
        } else if (this.currentPage > this.totalPages) { 
            this.currentPage = this.totalPages; 
        }
        
        if (this.totalPages <= 10) {
            // less than 10 total pages so show all
            this.startPage = 1;
            this.endPage = this.totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (this.currentPage <= 6) {
                this.startPage = 1;
                this.endPage = 10;
            } else if (this.currentPage + 4 >= this.totalPages) {
                this.startPage = this.totalPages - 9;
                this.endPage = this.totalPages;
            } else {
                this.startPage = this.currentPage - 5;
                this.endPage = this.currentPage + 4;
            }
        }

        this.pages = Array.from(Array((this.endPage + 1) - this.startPage).keys()).map(i => this.startPage + i);
    }

    doSearch(searchString: string): void {
        console.log("The new value for filter is :", searchString);

        if(searchString.length < 3) {
            console.log("Filter string length needs to be 3 charcters or higher", searchString.length);
        } else {
            console.log("Triggering the API call ...");
            this.getArticles(searchString, 0);
        }

    }

    // --- DATA FUNCTIONS --- //
   getArticles(query: string, page: number): void {
        this.loading = true;
        this.api.getArticles(query, page).subscribe(
            data => { 
                console.log(data);
                this.totalPages = data.nbPages;
                this.calculatePaging();
                this.articles = data.hits;
                this.loading = false;
            },
            err => { 
                console.log(err.status);
                this.loading = false;
            }
        );
    }
}