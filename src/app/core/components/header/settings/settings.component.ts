import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  @Output() toggle = new EventEmitter<void>();

  onButtonClick(): void {
    this.toggle.emit();
  }
}
