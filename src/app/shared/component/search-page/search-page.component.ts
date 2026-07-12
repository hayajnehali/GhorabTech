import {
  Component,
  computed,
  contentChild,
  DestroyRef,
  effect,
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
import { PagedResult } from '@models/results/search-filter';
import { FilterBase } from '@models/filter-base';
import { TranslateModule } from '@ngx-translate/core';
import { PageEvent } from '../pagination/pagination.component';

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
  pageSize(): number {
throw new Error('Method not implemented.');
}
  disableSearchContainer = input<boolean>(false);
  searchBase = output<void>();
  resetBase = output<void>();
  pageChange = output<PageEvent>();

  protected destroyRef = inject(DestroyRef);
  constructor() {
    super();
    effect(() => {
      this.pagedResult();
      this.isLoading.set(false);
    });
  }

  ngOnInit() {}

  ngOnDestroy() {}

  search() {
    this.isLoading.set(true);
    this.searchBase.emit();
  }

  loadData(event: PageEvent) {
    this.isLoading.set(true);
    this.pageChange.emit(event);
  }

  reset() {
    this.isLoading.set(true);
    this.resetBase.emit();
  }
}
