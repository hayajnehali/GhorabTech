import { Injectable } from "@angular/core";
import { ServiceBase } from "@shared/services/base.service";
import { BaseComponent } from "./base-component";

 
@Injectable({
  providedIn: 'root',
})
export class BaseManageComponent<TData, TResult, Filter extends object> extends BaseComponent {
  entity!: TResult;
  isEdit = false;
  
  constructor(protected service: ServiceBase<TData, TResult, Filter>) {
    super();
  }

  getById(id: number) {
    this.subscribe(
      this.service.getById(id).subscribe(res => {
        this.entity = res; 
        this.isEdit = true;
      })
    );
  }

  save() {
    if (this.isEdit) {
    //  this.subscribe(this.service.update((this as any).entity.id, this.model).subscribe());
    } else {
  //    this.subscribe(this.service.create(this.model).subscribe());
    }
  }
 
}
