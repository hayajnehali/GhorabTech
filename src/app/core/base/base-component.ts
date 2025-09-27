import { Directive, Injectable } from "@angular/core";
 
 @Directive()
export abstract  class BaseComponent {
  private subscriptions: any[] = [];

  protected subscribe(subscription: any) {
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe?.());
  }
}
