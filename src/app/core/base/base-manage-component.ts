import { Directive, inject, Injectable } from '@angular/core';
import { ServiceBase } from '@shared/services/base.service';
import { BaseComponent } from './base-component';
import { NgForm } from '@angular/forms';

@Directive()
export class BaseManageComponent<
  TData,
  TResult,
  Filter extends object
> extends BaseComponent {
  entity!: TData;
  isAdd = false;
  protected type: any;
  constructor(
    protected service: ServiceBase<TData, TResult, Filter>,
    protected itemType: new () => TData
  ) {
    super();
    this.type = itemType;
    this.entity = new this.type();
  }

  ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.isAdd = false;
      this.getById(id);
    } else {
      this.isAdd = true;
    }
    this.onInitData();
  }
  onInitData() {}

  getById(arg0: string) { 
   const sub= this.service.getById(arg0).subscribe({
      next: (req) => {
        let data = Object.assign(new this.type(), req);
        this.entity = data;
        this.onLoadedData(data);
      },
    });
     this.subscribe(sub);
  }

  onLoadedData(req: any) {}

  save(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.processData();
    if (this.isAdd) {
    
    const sub=  this.service.create(this.entity).subscribe({
        next: () => {},
        complete: () => {
          this.notificationService.showSuccess();
           this.goBack()
        },
        error: (err) => {
          this.notificationService.showError(err);
        },
      });
       this.subscribe(sub);
    } else {
       
     const sub= this.service.update(this.entity).subscribe({
        next: () => {},
        complete: () => {
          this.notificationService.showSuccess();
          this.goBack()
        },
        error: (err) => {
          this.notificationService.showError(err);
        },
      });
       this.subscribe(sub);
    }
  }
  processData() {}
  goBack() {
    if (this.isAdd)
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    else this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }
}
