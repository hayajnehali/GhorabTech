import { Component } from '@angular/core';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { KeyAttribute, KeyAttributeFilter, KeyAttributeResult } from '@models/key-attribute';
import { KeyAttributeService } from '@shared/services/key-attribute.service';

@Component({
  selector: 'app-key-attribute-list',
  templateUrl: './key-attribute-list.component.html',
  styleUrl: './key-attribute-list.component.scss'
})
export class KeyAttributeListComponent extends BaseListComponent<
  KeyAttribute,
  KeyAttributeResult,
  KeyAttributeFilter
> {
  constructor(private keyAttributeService: KeyAttributeService) {
    super(keyAttributeService,KeyAttributeFilter);
    this.displayedColumns = ['id', 'name', 'action'];
  }
}