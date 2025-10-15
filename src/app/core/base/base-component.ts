import { Directive, inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/services/notification.service';
import { Subscription } from 'rxjs';

@Directive()
export abstract class BaseComponent {
  private subscriptions: any[] = [];
  protected router = inject(Router);
  protected notificationService = inject(NotificationService);
  protected activatedRoute = inject(ActivatedRoute);
  protected translate = inject(TranslateService);


  // protected subscribe(subscription: any) {
  //   this.subscriptions.push(subscription);
  // }

  // ngOnDestroy(): void {
  //   this.subscriptions.forEach((s) => s.unsubscribe?.());
  // }


  private subscription = new Subscription();

protected subscribe(sub: Subscription) {
  this.subscription.add(sub);
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

}
