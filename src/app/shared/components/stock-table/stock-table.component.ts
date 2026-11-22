
import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  Stock
} from '../market-card/market-card.component';

@Component({
  selector: 'app-stock-table',
  standalone: true,
  imports: [],
  templateUrl: './stock-table.component.html',
  styleUrl: './stock-table.component.scss'
})
export class StockTableComponent {

  // Receive stocks from parent component
  @Input() stocks: Stock[] = [];

  // Send selected stock back to parent
  @Output() stockSelected = new EventEmitter<Stock>();

  // Handle stock row selection
  selectStock(stock: Stock): void {

    this.stockSelected.emit(stock);

    console.log('Selected stock:', stock.symbol);
  }

}
