
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface StockQuote {
  name: string;
  symbol: string;
  price: number;
  change: number;
}

interface TwelveDataQuote {
  symbol: string;
  name: string;
  close: string;
  percent_change: string;
  status?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {

  private apiUrl = 'https://api.twelvedata.com/quote';

  constructor(private http: HttpClient) {}

  getStockQuote(symbol: string): Observable<StockQuote> {

    return this.http.get<TwelveDataQuote>(this.apiUrl, {
      params: {
        symbol,
        apikey: environment.twelveDataApiKey
      }
    }).pipe(
      map(response => {

        if (response.status === 'error' || !response.close) {
          throw new Error(
            response.message || `Unable to fetch ${symbol}`
          );
        }

        return {
          name: response.name || symbol,
          symbol: response.symbol || symbol,
          price: Number(response.close),
          change: Number(response.percent_change)
        };
      })
    );
  }

  getMultipleQuotes(): Observable<StockQuote[]> {

    const symbols = ['AAPL', 'MSFT', 'TSLA'];

    return forkJoin(
      symbols.map(symbol => this.getStockQuote(symbol))
    );
  }
}
