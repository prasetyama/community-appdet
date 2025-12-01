import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private toastSubject = new BehaviorSubject<{ type: string, message: string } | null>(null);
  toast$ = this.toastSubject.asObservable();

  SetToast(toast: { type: string, message: string }) {
    this.toastSubject.next(toast);
    setTimeout(() => this.toastSubject.next(null), 5000);
  }
}