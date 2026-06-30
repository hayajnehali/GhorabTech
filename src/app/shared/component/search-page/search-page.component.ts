import {
  Component,
  computed,
  contentChild,
  DestroyRef,
  inject,
  input,
  model,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  GridResultComponent,
  LazyLoadEvent,
} from '../grid-result/grid-result.component';
import { GridResultBodyComponent } from './components/grid-result-body.component';
import { FormGroup } from '@angular/forms';
import { PagedResult } from '@models/results/search-filter';
import { FilterBase } from '@models/filter-base';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-base-page',
  standalone: true,
  template: `<!-- optional shared layout or leave empty -->`,
})
export abstract class BaseGridPageComponent {
  protected gridConfigCollector = contentChild(GridResultBodyComponent);
  protected gridConfig = computed(() => {
    const grid = this.gridConfigCollector();
    return {
      column: grid?.projectedColumns() ?? [],
      allowExpand: grid?.allowExpand() ?? false,
      expandedTemplate: grid?.projectedExpanded(),
    };
  });
}

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  standalone: true,
  imports: [GridResultComponent, TranslateModule],
})
export class SearchPageComponent<T extends FilterBase>
  extends BaseGridPageComponent
  implements OnInit, OnDestroy
{
  pagedResult = model<PagedResult<any>>(new PagedResult<any>());
  totalRecords = computed(() => this.pagedResult()?.totalCount || 0);
  items = computed(() => this.pagedResult()?.items || []);
  public isLoading = signal<boolean>(false);
  public selectedItems = signal<T[]>([]);
  filter = input.required<T>();
  searchBase = output<void>();
  resetBase = output<void>();
  searchForm = input<FormGroup>();
  protected destroyRef = inject(DestroyRef);
  constructor() {
    super();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  search() {
    const form = this.searchForm();
    if (form?.invalid) {
      form.markAllAsTouched();
      return;
    }

    this.searchBase.emit();
  }

  loadData(event: LazyLoadEvent) {
    // if (!this.url()) return;
    this.filter().pageSize = event.rows ?? 10;
    this.filter().pageIndex = (event.first ?? 0) / this.filter().pageSize + 1;
    this.search();
  }

  reset() {
    this.resetBase.emit();
  }
}
