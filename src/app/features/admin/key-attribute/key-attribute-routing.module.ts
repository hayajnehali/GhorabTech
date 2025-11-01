import { Routes } from "@angular/router";
import { KeyAttributeListComponent } from "./key-attribute-list/key-attribute-list.component";
import { KeyAttributeManageComponent } from "./key-attribute-manage/key-attribute-manage.component";

export const routesKeyAttribute: Routes = [
    {
        path:"",
        component:KeyAttributeListComponent
    },
    {
        path:"manage",
        component:KeyAttributeManageComponent
    },
    {
        path:"manage/:id",
        component:KeyAttributeManageComponent
    }
]