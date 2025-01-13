import { RouterModule, Routes } from '@angular/router'; 
import { NgModule } from '@angular/core'; 
import { AdminModule } from './admin/admin-module/admin.module';
import { AdminLayOutComponent } from './admin/admin-module/layout/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin/admin-module/admin-dashboard/admin-dashboard.component';
import { GuestLayOutComponent } from './guest-user/layout/guest-layout/guest-layout.component';

// export const routes: Routes = [
//     {
//         path:"admin",
//         loadChildren: () => AdminModule 
//     }
// ];

const routes: Routes = [ 
  {
    path: 'guest',
    component: GuestLayOutComponent, 
    children: [
      { path: '',loadChildren: () => import('./guest-user/guest-user.module').then(m => m.GuestUserModule) 
      }, 
  //    { path: 'settings', component: GuestLayOutComponent }  
    ]
  },
    {
      path: 'admin',
      component: AdminLayOutComponent,           // Admin layout
      children: [
        { path: '',loadChildren: () => import('./admin/admin-module/admin.module').then(m => m.AdminModule) // Load AdminModule lazily
        }, // Default admin dashboard
        { path: 'settings', component: AdminLayOutComponent } // Admin settings
      ]
    },

    { path: '', redirectTo: 'guest', pathMatch: 'full' },
    { path: '**', redirectTo: 'guest' } // Wildcard route redirects to user
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],  // Initialize routing
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  