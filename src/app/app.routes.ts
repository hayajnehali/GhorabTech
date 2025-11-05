import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminLayOutComponent } from './features/admin/layout/admin-layout/admin-layout.component';
import { UserLayOutComponent } from './features/user/layout/user-layout/user-layout.component';
import { LoginComponent } from '@shared/component/login/login.component';
import { authChildGuard } from 'Auth/interceptor/auth.guard';
import { RegistrationComponent } from '@shared/component/registration/registration.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserLayOutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegistrationComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayOutComponent, // Admin layout
    canActivateChild: [authChildGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/admin/admin.module').then((m) => m.AdminModule), // Load AdminModule lazily
      }, // Default admin dashboard
      { path: 'settings', component: AdminLayOutComponent }, // Admin settings
    ],
  },
  // {
  //   path: 'login',
  //   component: UserLayOutComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: LoginComponent,
  //     },
  //   ],
  // },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', redirectTo: 'user' }, // Wildcard route redirects to user
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Initialize routing
  exports: [RouterModule],
})
export class AppRoutingModule {}
