import { Component } from '@angular/core';

@Component({
  selector: 'app-admint-side-bar',
  templateUrl: './admint-side-bar.component.html',
  styleUrl: './admint-side-bar.component.scss'
})
export class AdmintSideBarComponent {
  isSidebarActive = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
}
