import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseManageComponent } from '@core/base/base-manage-component';
import { LocalizedString } from '@core/base/localized-string ';
import {
  KeyAttribute,
  KeyAttributeFilter,
  KeyAttributeResult,
} from '@models/key-attribute';
import { KeyAttributeValue } from '@models/key-attribute-value';
import { KeyAttributeService } from '@shared/services/key-attribute.service';

@Component({
    selector: 'app-key-attribute-manage',
    templateUrl: './key-attribute-manage.component.html',
    styleUrl: './key-attribute-manage.component.scss',
    standalone: false
})
export class KeyAttributeManageComponent extends BaseManageComponent<
  KeyAttribute,
  KeyAttributeResult,
  KeyAttributeFilter
> {
  dataSource = new MatTableDataSource<KeyAttributeValue>();
  displayedColumns: string[] = ['nameEn', 'nameAr', 'actions'];
  constructor(private keyAttributeService: KeyAttributeService) {
    super(keyAttributeService, KeyAttribute);
  }

  addValue() {
    let item = new KeyAttributeValue();
    item.value = new LocalizedString();
      this.entity.keyAttributeValues.push(item);
    //this.dataSource.data.push(item);
    //this.dataSource._updateChangeSubscription();
  }
  // addValue() {
  //   let item = new KeyAttributeValue();
  //   item.value = new LocalizedString();
  //   //  this.entity.keyAttributeValues.push(item);
  //   this.dataSource.data.push(item);
  //   this.dataSource._updateChangeSubscription();
  // }

  removeValue(index: number) {
     this.entity.keyAttributeValues.splice(index, 1); 
  }
  // removeValue(index: number) {
  //   this.dataSource.data.splice(index, 1);
  //   this.dataSource._updateChangeSubscription();
  // }
}
