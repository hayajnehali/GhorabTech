import { Component, contentChild, contentChildren, input } from "@angular/core";
import { GridColumnDirective, GridExpandedDirective } from "@shared/component/grid-result/components/grid-column.directive";

@Component({
    selector: 'grid-result-body',
    standalone: true,
    template: ``
})
export class GridResultBodyComponent {
    projectedColumns = contentChildren(GridColumnDirective);
    allowSelection = input<boolean>(false);
    allowExpand = input<boolean>(false);
    projectedExpanded = contentChild(GridExpandedDirective);
}
