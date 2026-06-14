import { contentChild, ContentChild, Directive, input, TemplateRef } from '@angular/core';

@Directive({
    selector: 'grid-column',
    standalone: true
})
export class GridColumnDirective {
    label = input.required<string>();
    field = input.required<string>();
    sortable = input<boolean>(true);

    template = contentChild(TemplateRef);  
}

@Directive({
    selector: 'grid-expanded',
    standalone: true
})
export class GridExpandedDirective {
  template = contentChild(TemplateRef);
}
