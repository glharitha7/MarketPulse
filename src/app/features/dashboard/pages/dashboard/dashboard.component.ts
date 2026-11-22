
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs';

import {
  MarketCardComponent,
  Stock
} from '../../../../shared/components/market-card/market-card.component';

import {
  StockTableComponent
} from '../../../../shared/components/stock-table/stock-table.component';

import {
  MarketDataService
} from '../../../../core/services/market-data.service';

interface LifecycleLog {
  hook: string;
  message: string;
  time: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MarketCardComponent, StockTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent
  implements OnInit, AfterViewInit, OnDestroy {

  stocks: Stock[] = [];

  selectedStock: Stock | null = null;

  loading = false;
  errorMessage = '';

  lifecycleLogs: LifecycleLog[] = [];

  private stockSubscription?: Subscription;

  constructor(
    private marketDataService: MarketDataService
  ) {}

  addLifecycleLog(hook: string, message: string): void {

    this.lifecycleLogs.unshift({
      hook,
      message,
      time: new Date().toLocaleTimeString()
    });

    this.lifecycleLogs = this.lifecycleLogs.slice(0, 10);
  }

  ngOnInit(): void {

    this.addLifecycleLog(
      'ngOnInit',
      'Dashboard component initialized'
    );

    this.loadStocks();
  }

  loadStocks(): void {

    this.loading = true;
    this.errorMessage = '';

    this.stockSubscription = this.marketDataService
      .getMultipleQuotes()
      .subscribe({

        next: (data) => {

          console.table(data);

          this.stocks = data;

          this.loading = false;

          this.addLifecycleLog(
            'API Success',
            'Real stock prices loaded successfully'
          );
        },

        error: (error) => {

          this.loading = false;

          this.errorMessage =
            error.message || 'Unable to load stock data';

          this.addLifecycleLog(
            'API Error',
            this.errorMessage
          );
        }
      });
  }

  onStockSelected(stock: Stock): void {
    this.selectedStock = stock;
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit executed');
  }

  ngOnDestroy(): void {

    this.stockSubscription?.unsubscribe();

    console.log('Dashboard destroyed');
  }
}
