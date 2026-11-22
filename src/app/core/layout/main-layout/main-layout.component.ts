
import { Component } from '@angular/core';

import {
  RouterLink,
  RouterOutlet,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,

  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],

  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: '◫'
    },
    {
      label: 'Stocks',
      path: '/stocks',
      icon: '▥'
    },
    {
      label: 'Watchlist',
      path: '/watchlist',
      icon: '☆'
    },
    {
      label: 'Portfolio',
      path: '/portfolio',
      icon: '▤'
    },
    {
      label: 'Alerts',
      path: '/alerts',
      icon: '♧'
    }
  ];

}
