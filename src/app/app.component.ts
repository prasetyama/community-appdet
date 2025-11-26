import { Component } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
 

interface TicketCategory {
  title: string;
  highlight: string;
  description: string;
  badge?: string;
}

interface FeatureHighlight {
  title: string;
  description: string;
  metric: string;
  accent: string;
}

interface StepItem {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  ticketCategories: TicketCategory[] = [
    {
      title: 'Konser Besar',
      highlight: '100.000+',
      description: 'Antrean masif dengan performa stabil dan sistem anti calo.'
    },
    {
      title: 'Konferensi & Seminar',
      highlight: 'Hybrid',
      description: 'Integrasi onsite-online lengkap dengan validasi otomatis.'
    },
    {
      title: 'Event Komunitas',
      highlight: 'Custom',
      description: 'Personalisasi tampilan dan jalur pembayaran dalam hitungan menit.'
    },
    {
      title: 'Festival Wisata',
      highlight: '7 Hari',
      description: 'Kontrol kapasitas multi-hari dengan dashboard real-time.'
    }
  ];

  highlightFeatures: FeatureHighlight[] = [
    {
      title: 'Server KUAT, ANTI DOWN',
      description: 'Arsitektur multi-region menjamin distribusi traffic merata di jam sibuk.',
      metric: '99.95% uptime',
      accent: 'from-emerald-400 to-emerald-600'
    },
    {
      title: 'Biaya Operasional MURAH',
      description: 'Tidak ada biaya tersembunyi. Hanya bayar sesuai tiket yang terjual.',
      metric: 'Mulai 3K/tiket',
      accent: 'from-sky-400 to-blue-600'
    },
    {
      title: 'Monitoring REAL-TIME',
      description: 'Pantau penjualan, gate, hingga performa server dari satu dashboard.',
      metric: 'Dashboard 24/7',
      accent: 'from-amber-400 to-orange-500'
    }
  ];

  steps: StepItem[] = [
    {
      title: 'Atur Eventmu',
      description: 'Lengkapi informasi event, seat map, serta jalur pembayaran favorit.',
      icon: '📝'
    },
    {
      title: 'Promosikan Tiket',
      description: 'Bagikan tautan landing page FibrTix yang sudah otomatis mobile friendly.',
      icon: '📣'
    },
    {
      title: 'Scan & Monitoring',
      description: 'Gunakan aplikasi scanner kami untuk validasi gate tanpa antrian.',
      icon: '🎫'
    }
  ];
  
}
