import { Component } from '@angular/core';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { User, UserFilter, UserResult } from '@models/user';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-user-list', 
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  standalone:false
})
export class UserListComponent extends BaseListComponent<
  User,
  UserResult,
  UserFilter
> {
  constructor(private userService: UserService) {
    super(userService, UserFilter);
    this.displayedColumns = ['name', 'email','country', 'phone' ];
  }
}
