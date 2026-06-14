import { Component, computed, contentChild, DestroyRef, inject, input, model, OnDestroy, OnInit, output, signal } from '@angular/core';
import { GridResultComponent, LazyLoadEvent } from '../grid-result/grid-result.component';
import { GridResultBodyComponent } from './components/grid-result-body.component';
import { FormGroup } from '@angular/forms';
import { finalize, Subject, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { environment } from '@shared/environment/environment';
import { PagedResult, SearchFilter } from '@models/results/search-filter';
import { ButtonComponent } from "../ui/button/button/button.component";

@Component({
    selector: 'app-base-page',
    standalone: true,
    template: `<!-- optional shared layout or leave empty -->`
})
export abstract class BaseGridPageComponent {
    protected gridConfigCollector = contentChild(GridResultBodyComponent);
    protected gridConfig = computed(() => {
        const grid = this.gridConfigCollector();
        return {
            column: grid?.projectedColumns() ?? [],
            allowExpand: grid?.allowExpand() ?? false,
            expandedTemplate: grid?.projectedExpanded()
        };
    });
}

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  standalone: true,
  imports: [
    GridResultComponent,
    ButtonComponent
],
})
export class SearchPageComponent<T = any> extends BaseGridPageComponent implements OnInit, OnDestroy {
    filterForm = input.required<FormGroup>();
    url = input.required<string>();
    searchTrigger = input.required<Subject<void>>();
    pagedResult = model<PagedResult<any>>(new PagedResult<any>());

    totalRecords = computed(() => this.pagedResult()?.totalCount || 0);
    items = computed(() => this.pagedResult()?.items || []);

    public isLoading = signal<boolean>(false);
    public selectedItems = signal<T[]>([]);

    private filter = new SearchFilter<T>();
    onResetSearch = output<void>();

    protected http = inject(HttpClient);
    protected destroyRef = inject(DestroyRef);

    $searchTriggerObservable = toObservable(this.searchTrigger)
        .pipe(
            switchMap((subject) => subject),
            takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
            this.search();
        });

    constructor() {
        super();
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.$searchTriggerObservable?.unsubscribe();
    }

    search() {
        this.callApi();
    }

    loadData(event: LazyLoadEvent) {
        if (!this.url()) return;

        this.filter.pageSize = event.rows ?? 10;
        this.filter.pageNumber = (event.first ?? 0) / this.filter.pageSize + 1;

        this.callApi();
    }

    callApi() {
        let url = environment.apiUrl + this.url();
        this.filter.criteria = this.filterForm().getRawValue();

        this.isLoading.set(true);
        this.http
            .post<any>(url, this.filter)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.isLoading.set(false))
            )
            .subscribe({
                next: (res) => {
                    this.pagedResult.set(res);
                },
                error: (err) => {
                    this.isLoading.set(false);
                }
            });
    }

    reset() {
        this.filterForm().reset();
        this.onResetSearch.emit();
    }
  }
