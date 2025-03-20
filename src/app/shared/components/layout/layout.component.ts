import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
    isSidebarHidden = false;
    isDarkTheme$ = this.themeService.isDarkTheme$;

    constructor(private themeService: ThemeService) {}

    toggleSidebar() {
      this.isSidebarHidden = !this.isSidebarHidden;
    }

    toggleTheme() {
      this.themeService.toggleTheme();
    }
} 