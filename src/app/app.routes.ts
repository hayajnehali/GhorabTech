import { RouterModule, Routes } from '@angular/router'; 
import { NgModule } from '@angular/core';   
import { AdminLayOutComponent } from './features/admin/layout/admin-layout/admin-layout.component';
import { UserLayOutComponent } from './features/user/layout/user-layout/user-layout.component';

 
const routes: Routes = [ 
  {
    path: 'user',
    component: UserLayOutComponent, 
    children: [
      { path: '',loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) 
      },  
    ]
  },
    {
      path: 'admin',
      component: AdminLayOutComponent,           // Admin layout
      children: [
        { path: '',loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) // Load AdminModule lazily
        }, // Default admin dashboard
        { path: 'settings', component: AdminLayOutComponent } // Admin settings
      ]
    },

    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: '**', redirectTo: 'user' } // Wildcard route redirects to user
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],  // Initialize routing
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  