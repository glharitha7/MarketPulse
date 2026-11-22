
import { DecimalPipe } from '@angular/common';

import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  ContentChild,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';

export interface Stock {
  name: string;
  symbol: string;
  price: number;
  change: number;
}

export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
}

@Component({
  selector: 'app-market-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './market-card.component.html',
  styleUrl: './market-card.component.scss'
})
export class MarketCardComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy {

  @Input() stock!: Stock;

  @ContentChild('stockTitle')
  stockTitle!: ElementRef;

  @ViewChild('priceChart')
  priceChart!: ElementRef<HTMLCanvasElement>;

  candles: Candle[] = [];

  private previousPrice!: number;
  private chartContext!: CanvasRenderingContext2D;
  private chartDirty = false;

  trendLabel = 'Waiting for prices';

  constructor() {
    console.log('Market Card Constructor');
  }

  // 1. Input changes
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');

    if (changes['stock']) {
      console.log('Previous:', changes['stock'].previousValue);
      console.log('Current:', changes['stock'].currentValue);
    }
  }

  // 2. Initialize simulated historical candles
  ngOnInit(): void {
    console.log('ngOnInit');

    this.previousPrice = this.stock.price;

    this.trendLabel =
    this.stock.change > 0 ? 'Up today' :
    this.stock.change < 0 ? 'Down today' :
    'Unchanged today';

    let price = this.stock.price;

    // Generate 8 simulated historical candles
    for (let i = 0; i < 8; i++) {

      const open = price;

      const movement = Number(
        ((Math.random() - 0.5) * 4).toFixed(2)
      );

      const close = Number(
        (open + movement).toFixed(2)
      );

      const high = Number(
        (Math.max(open, close) + Math.random()).toFixed(2)
      );

      const low = Number(
        (Math.min(open, close) - Math.random()).toFixed(2)
      );

      this.candles.push({
        open,
        high,
        low,
        close
      });

      price = close;
    }

    // Align the latest candle with current stock price
    const lastCandle = this.candles[this.candles.length - 1];

    const difference = this.stock.price - lastCandle.close;

    lastCandle.open = Number(
      (lastCandle.open + difference).toFixed(2)
    );

    lastCandle.high = Number(
      (lastCandle.high + difference).toFixed(2)
    );

    lastCandle.low = Number(
      (lastCandle.low + difference).toFixed(2)
    );

    lastCandle.close = this.stock.price;
  }

  // 3. Detect stock price changes
  ngDoCheck(): void {

    if (this.previousPrice === undefined) {
      this.previousPrice = this.stock.price;
      return;
    }

    if (this.previousPrice === this.stock.price) {
      return;
    }

    const open = this.previousPrice;
    const close = this.stock.price;

    const high = Number(
      (Math.max(open, close) + Math.random() * 0.8).toFixed(2)
    );

    const low = Number(
      (Math.min(open, close) - Math.random() * 0.8).toFixed(2)
    );

    const newCandle: Candle = {
      open,
      high,
      low,
      close
    };

    this.candles.push(newCandle);

    // Keep only the latest 12 candles
    if (this.candles.length > 12) {
      this.candles.shift();
    }

    const movement = Number(
      (close - open).toFixed(2)
    );

    this.trendLabel =
      movement > 0 ? 'Increasing' :
      movement < 0 ? 'Decreasing' :
      'Unchanged';

    console.table({
      stock: this.stock.symbol,
      open,
      close,
      movement,
      colour:
        close > open ? 'GREEN' :
        close < open ? 'RED' :
        'YELLOW'
    });

    this.previousPrice = close;
    this.chartDirty = true;
  }

  // 4. Projected content initialized
  ngAfterContentInit(): void {
    console.log(
      'Projected title:',
      this.stockTitle?.nativeElement.textContent
    );
  }

  // 5. Projected content checked
  ngAfterContentChecked(): void {
    // Angular checks projected content here.
  }

  // 6. Own view initialized

  ngAfterViewInit(): void {

    const canvas = this.priceChart.nativeElement;

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    this.chartContext = context;

    // Actual displayed dimensions
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Screen pixel density
    const dpr = window.devicePixelRatio || 1;

    // Increase internal canvas resolution
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Scale drawing coordinates
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.drawChart();
  }


  // 7. Draw candlestick chart
  drawChart(): void {

    if (!this.chartContext || this.candles.length === 0) {
      return;
    }

    const canvas = this.priceChart.nativeElement;
    const ctx = this.chartContext;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const leftPadding = 10;
    const rightPadding = 10;
    const topPadding = 10;
    const bottomPadding = 10;

    ctx.clearRect(0, 0, width, height);

    // Find highest and lowest prices
    const highest = Math.max(
      ...this.candles.map(candle => candle.high)
    );

    const lowest = Math.min(
      ...this.candles.map(candle => candle.low)
    );

    const range = highest - lowest || 1;

    const chartHeight = height - topPadding - bottomPadding;
    const chartWidth = width - leftPadding - rightPadding;

    // Convert price into canvas Y position
    const getY = (price: number): number => {
      return topPadding +
        ((highest - price) / range) * chartHeight;
    };

    // Draw horizontal grid lines
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 3; i++) {

      const y = topPadding + (chartHeight / 3) * i;

      ctx.beginPath();
      ctx.moveTo(leftPadding, y);
      ctx.lineTo(width - rightPadding, y);
      ctx.stroke();
    }

    // Calculate candle spacing
    const candleSpacing = chartWidth / this.candles.length;

    const candleWidth = Math.min(
      12,
      candleSpacing * 0.55
    );

    // Draw every candle
    this.candles.forEach((candle, index) => {

      const centerX =
        leftPadding + candleSpacing * index + candleSpacing / 2;

      const openY = getY(candle.open);
      const closeY = getY(candle.close);
      const highY = getY(candle.high);
      const lowY = getY(candle.low);

      // Determine colour independently for each candle
      let color: string;

      if (candle.close > candle.open) {
        color = '#22c55e'; // Green - Bullish
      } else if (candle.close < candle.open) {
        color = '#ef4444'; // Red - Bearish
      } else {
        color = '#facc15'; // Yellow - Unchanged
      }

      // Draw wick
      ctx.beginPath();
      ctx.moveTo(centerX, highY);
      ctx.lineTo(centerX, lowY);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw candle body
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.max(
        2,
        Math.abs(closeY - openY)
      );

      ctx.fillStyle = color;

      ctx.fillRect(
        centerX - candleWidth / 2,
        bodyTop,
        candleWidth,
        bodyHeight
      );

    });
  }

  // 8. Update chart after view check
  ngAfterViewChecked(): void {

    if (this.chartDirty && this.chartContext) {

      this.drawChart();

      this.chartDirty = false;
    }
  }

  // 9. Component destroyed
  ngOnDestroy(): void {
    console.log('MarketCard destroyed');
  }
}
