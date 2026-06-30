import { Component } from "@angular/core";

@Component({
    selector: 'header-actions',
    standalone: true,
    template: `<div class="d-flex align-items-center justify-content-end gap-2py-3" ><ng-content></ng-content></div>`,
})
export class HeaderActionsComponent {}