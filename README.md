# 📈 MarketPulse – Stock Market Dashboard

MarketPulse is a stock market dashboard built using **Angular 18 and TypeScript**. It provides an interactive interface to explore stock prices, monitor market movements, and view individual stock details.

The application integrates with the **Twelve Data API** to retrieve stock market quotes and displays the information through reusable Angular components.

## ✨ Features

- **Stock Market Overview:** Display multiple stocks with their current prices.
- **Stock Cards:** Show company names, symbols, prices, and percentage changes.
- **Stock Table:** Display stock information in a structured table.
- **Stock Selection:** Select individual stocks to view their details.
- **Candlestick Charts:** Visualize stock price movements.
- **Price Indicators:** Use green and red indicators for positive and negative movements.
- **API Integration:** Fetch stock quotes using HTTP requests.
- **Reusable Components:** Maintain a modular and maintainable application structure.

## 🛠️ Technologies Used

- Angular 18
- TypeScript
- HTML5
- SCSS
- RxJS
- REST API
- Twelve Data API

## 📸 Application Preview

<!-- Add your dashboard screenshot here -->

## 📂 Project Structure

```text
src/
 └── app/
     ├── core/
     │   ├── layout/
     │   └── services/
     │       └── market-data.service.ts
     │
     ├── features/
     │   └── dashboard/
     │       └── pages/
     │           └── dashboard/
     │
     └── shared/
         └── components/
             ├── market-card/
             └── stock-table/
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Angular CLI 18.2.21

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/glharitha7/MarketPulse.git
```

**2. Navigate to the project directory**

```bash
cd MarketPulse
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure the API**

Create your local environment configuration file and configure your Twelve Data API key.

Keep your API key private. The local environment file is excluded from Git.

For production, use a backend proxy to protect the API key.

**5. Start the development server**

```bash
ng serve
```

Navigate to `http://localhost:4200/`.

## 🏗️ Build

Run the following command to build the project:

```bash
ng build
```

Build artifacts are stored in the `dist/` directory.

## 🧪 Testing

Run unit tests using:

```bash
ng test
```

## 🧠 Angular Concepts Practiced

- Standalone Components
- Component Communication (`@Input()` and `@Output()`)
- Angular Lifecycle Hooks
- Services and Dependency Injection
- HTTP Client
- Observables and RxJS
- Property Binding and Event Binding
- Angular Control Flow (`@if`, `@for`)
- Reusable Component Architecture

## 🔮 Future Enhancements

- Stock search and filtering
- Watchlist management
- Historical stock market data
- Real-time price updates
- Actual OHLC-based candlestick charts
- Portfolio tracking
- Additional stock exchanges and market indices

## 👩‍💻 Author

**Haritha**

GitHub: [glharitha7](https://github.com/glharitha7)

---

*MarketPulse – Track the market. Understand the movement.*