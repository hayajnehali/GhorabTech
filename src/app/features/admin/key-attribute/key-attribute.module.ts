import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyAttributeListComponent } from './key-attribute-list/key-attribute-list.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { routesKeyAttribute } from './key-attribute-routing.module';
import { KeyAttributeManageComponent } from './key-attribute-manage/key-attribute-manage.component';
import { KeyAttributeValueListComponent } from './key-attribute-value/key-attribute-value-list/key-attribute-value-list.component';
import { KeyAttributeValueManageComponent } from './key-attribute-value/key-attribute-value-manage/key-attribute-value-manage.component';
import { FormErrorComponent } from "@shared/component/form-error/form-error.component";



@NgModule({
  declarations: [
    KeyAttributeListComponent,
    KeyAttributeManageComponent,
    KeyAttributeValueListComponent,
    KeyAttributeValueManageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routesKeyAttribute),
    FormErrorComponent
]
})
export class KeyAttributeModule { }
