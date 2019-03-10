import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, catchError, map, combineLatest } from 'rxjs/operators';
import { IDataMock } from '../../interfaces/data-mock.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataMockService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public getPhotos(): Observable<Array<IDataMock>> {
    const url = `${this.baseUrl}/list`;

    return this.http.get<Array<IDataMock>>(url).pipe(
      tap((): void => console.info('Pulled data.')),
      catchError(this.handleError('getPhotos', [])),
    );
  }

  public getPhotosBatch(start: number, offset: number) {
    const url = `${this.baseUrl}/list`;

    return this.http.get<Array<IDataMock>>(url).pipe(
      tap((): void => console.info('Pulled data.')),
      map((data: Array<IDataMock>): Array<IDataMock> => {
        // No need to worry about overflow, slice handles it
        const end = start + offset;
        return data.slice(start, end < 100 ? end : 100);
      }),
      catchError(this.handleError('getPhotosBatch', [])),
    );
  }
}
