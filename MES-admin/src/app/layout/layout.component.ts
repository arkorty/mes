import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuService } from '../services/menu/menu.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private router = inject(Router);
  private menuService = inject(MenuService);
  projectName:string='Mountain Expedition'
  isCollapsed = false;
  activeSubmenu: string | null = null;
  menuItems = this.menuService.getMenuItems();


  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSubmenu(submenu: string) {
    this.activeSubmenu = this.activeSubmenu === submenu ? null : submenu;
  }

  Navigate(route: string) {
    this.router.navigate([route]);
  }
}
