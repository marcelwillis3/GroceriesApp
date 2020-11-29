import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/*
  Generated class for the GroceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceriesServiceProvider {

  items = <any>[];
  dataChanged$: Observable<boolean>;
  baseURL = "http://localhost:8080";
  
  private dataChangedSubject: Subject<boolean>;

  constructor(public http: HttpClient) {
    console.log('Hello GroceriesServiceProvider Provider');

    this.dataChangedSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangedSubject.asObservable();
  }

  getItems(): Observable<object[]>{
    return this.http.get(this.baseURL + "/api/groceries").pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response){
    let body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.error("A client-side or network error occurred: ", error.error.message);
    } else{
      console.error(`Backend returned code: ${error.status}, ` + `body was: ${error.error}`);
    }
    return Observable.throw("Oops! Something went bad. See console message for details.");
  }

  removeItem(id){
    console.log("Removing Item - id = ", id);
    this.http.delete(this.baseURL + "/api/groceries/" + id).subscribe(res => {
      this.items = res;
      this.dataChangedSubject.next(true)
    });
  }

  addItem(item){
    this.http.post(this.baseURL + "/api/groceries/", item).subscribe(res => {
      this.items = res;
      this.dataChangedSubject.next(true)
    });
  }

  editItem(item, index){
    this.http.put(this.baseURL + "/api/groceries/" + item._id, item).subscribe(res => {
      this.items = res;
      this.dataChangedSubject.next(true);
    })
  }

}
