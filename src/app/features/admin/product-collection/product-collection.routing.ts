import { Routes } from '@angular/router';
import { ManageProductCollectionComponent } from './pages/manage-product-collection/manage-product-collection.component';
import { SearchProductCollectionComponent } from './pages/search-product-collection/search-product-collection.component';

export const routes: Routes = [
  {
    path: '',
    component: SearchProductCollectionComponent,
  },
  {
    path: 'create',
    component: ManageProductCollectionComponent,
  },
  {
    path: 'edit/:id',
    component: ManageProductCollectionComponent,
  }
];
