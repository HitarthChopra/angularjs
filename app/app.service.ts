import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class AppService {
    //URL for CRUD operations
    articleUrl = "http://localhost:3000/data";
    accessURL = "http://localhost:3000/accessLevel";
    //Create constructor to get Http instance
    constructor(private http:HttpClient) { 
    }
    //Fetch all articles
    getAllArticles(): Observable<any[]> {
        return this.http.get(this.articleUrl)
	   .map(this.extractData)
	   .catch(this.handleError);

    }
	
    //Fetch access level
    getAccess(): Observable<any[]> {
        return this.http.get(this.accessURL)
	   .map(this.extractData)
	   .catch(this.handleError);

    }
	
    //Create article
    createArticle(article: any):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.articleUrl, article)
               .map(this.extractData)
               .catch(this.handleError);
    }
    //Fetch article by id
    getArticleById(articleId: string): Observable<any> {
	console.log(this.articleUrl +"/"+ articleId);
	return this.http.get(this.articleUrl +"/"+ articleId)
	   .map(this.extractData)
	   .catch(this.handleError);
    }	
    //Update article
    updateArticle(article: any):Observable<number> {
        return this.http.put(this.articleUrl +"/"+ article.id, article)
               .map(this.extractData)
               .catch(this.handleError);
    }
    //Delete article	
    deleteArticleById(articleId: string): Observable<number> {
	return this.http.delete(this.articleUrl +"/"+ articleId)
	       .map(this.extractData)
               .catch(this.handleError);
    }	
    private extractData(res: Response) {
	let body = res;
        return body;
    }
    private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.status);
    }
} 
