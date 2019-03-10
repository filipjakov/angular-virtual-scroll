import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IDataMock } from 'src/app/interfaces/data-mock.interface';
import { DataMockService } from 'src/app/services/data-mock/data-mock.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { pairwise, startWith, scan, mergeMap, tap, throttleTime } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-infinte-scroll',
  templateUrl: './infinte-scroll.component.html',
  styleUrls: ['./infinte-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfinteScrollComponent implements OnInit, OnDestroy{
  @ViewChild(CdkVirtualScrollViewport) private viewPort: CdkVirtualScrollViewport;
  public offset: BehaviorSubject<number> = new BehaviorSubject(0);
  public photos$: Observable<Array<IDataMock>>;

  private batchSize: number = 20;
  private end: boolean = false;

  constructor(
    private dataMockService: DataMockService,
    private ref: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.photos$ = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.getBatch(n)),
      scan((acc, batch) => [...acc, ...batch], []),
    );
  }

  public nextBatch(offset: number): void {
    const end = this.viewPort.getRenderedRange().end;
    const total = this.viewPort.getDataLength();

    if (end === total) {
      // console.log(offset);
      this.offset.next(offset);
    }
  }

  public getBatch(n: number): Observable<Array<IDataMock>> {
    return this.dataMockService.getPhotosBatch(n, this.batchSize).pipe(
      tap((data: Array<IDataMock>) => data.length > 0 ? null : (this.end = true)),
    );
  }

  public ngOnDestroy(): void {
  }
}
