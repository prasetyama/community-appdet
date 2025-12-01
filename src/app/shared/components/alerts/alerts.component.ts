import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AlertsService } from '../../../services/alerts.service';

export type ToastType = 'success' | 'error' | 'info';


@Component({
  selector: 'fibr-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})

export class AlertsComponent {

  toast$ = this.alertsService.toast$;

  constructor(private alertsService: AlertsService) {}

  ngOnInit(): void {}

}
