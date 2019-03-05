import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
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

  public getPhotos(): Observable<Array<IDataMock>> {
    const url = `${this.baseUrl}/list`;

    return this.http.get<Array<IDataMock>>(url).pipe(
      tap((): void => console.info('Pulled data.')),
      catchError((err: any) => {
        console.error(err);
        return of([]);
      }),
    );
  }
}
