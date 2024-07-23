import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FilteringBlockComponent } from 'app/core/components/header/filtering-block/filtering-block.component';
import { LoginBlockComponent } from './login-block/login-block.component';
import { LogoComponent } from './logo/logo.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    SearchComponent,
    SettingsComponent,
    LoginBlockComponent,
    FilteringBlockComponent,
    NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isComponentVisible: boolean = false;

  toggleComponent(): void {
    this.isComponentVisible = !this.isComponentVisible;
  }

  clickSearch(): void {
    this.isComponentVisible = !this.isComponentVisible;
  }
}
