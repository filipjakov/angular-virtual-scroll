import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataMock } from 'src/app/interfaces/data-mock.interface';
import { DataMockService } from 'src/app/services/data-mock/data-mock.service';


@Component({
  selector: 'app-infinte-scroll',
  templateUrl: './infinte-scroll.component.html',
  styleUrls: ['./infinte-scroll.component.scss']
})
export class InfinteScrollComponent implements OnInit {
  public photos$: Observable<Array<IDataMock>>;

  constructor(
    private dataMockService: DataMockService,
  ) { }

  public ngOnInit() {
    this.photos$ = this.dataMockService.getPhotos();
  }
}
