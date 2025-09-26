# Bitquery Price Feeds SDK

📊 A lightweight SDK to fetch and stream crypto price data from [Bitquery](https://bitquery.io/) using its Trading APIs.
This project provides wrappers around Bitquery GraphQL queries and subscriptions so developers can easily get **real-time prices, historical data, and token information**.

---

## 🚀 Features

* Get the latest token price in USD
* Stream live token price updates
* Convert token addresses into `currencyId` for queries
* Extendable query SDK workflow for adding new APIs
* Open source & developer-friendly

---

## 📦 Installation

```bash
npm install @bitquery/pricefeeds
```

(or clone and use locally if unpublished)

---

## ⚡ Quick Start

### 1. Get a `currencyId` for a token

```js
const { getCurrencyId } = require("@bitquery/pricefeeds");

(async () => {
  const currencyId = await getCurrencyId("<Access Token>", "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"); // WETH address
  console.log(currencyId); // e.g. "bid:ethereum"
})();
```

---

### 2. Get the latest price for a token

```js
const { getTokenPrice } = require("@bitquery/pricefeeds");

(async () => {
  const data = await getTokenPrice("<Access Token>", "bid:bitcoin");
  console.log(data);
})();
```

---

### 3. Stream live token price updates

```js
const { getTokenPriceStream } = require("@bitquery/pricefeeds");

const ws = getTokenPriceStream("<Access Token>", "bid:bitcoin", {
  autoCloseMs: 15000, // optional: auto-close after 15 seconds
  onData: (data) => {
    console.log("Live BTC Price:", JSON.stringify(data, null, 2));
  },
  onError: (err) => {
    console.error("Stream error:", err);
  },
});

// ws.close() // manually close if needed
```

---

## 🛠️ Available Functions

| Function              | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| `getCurrencyId`       | Get `currencyId` from a token address (required for queries)  |
| `getTokenPrice`       | Fetch the latest token price (point-in-time query)            |
| `getTokenPriceStream` | Subscribe to real-time token price updates (WebSocket stream) |

---

## 🧩 Extending the SDK (Adding New Queries)

To add support for more Trading APIs (e.g., OHLC candles, trades, liquidity pools):

### Workflow

1. **Create a new query file** in `queries/` with naming convention:
   `<result-returned>-query.js`
   Example: `token-price-query.js`

   ```js
   const tokenPriceQuery = (currencyId) => {
     return `
     {
       Trading {
         Tokens(
           where: {Currency: { Id: {is: "${currencyId}" } }, Interval: {Time: {Duration: {eq: 1}}}}
           limit: {count: 1}
           orderBy: {descending: Block_Time}
         ) {
           Token { Id Symbol Network }
           Price { Ohlc { Close High Low Open } }
         }
       }
     }
     `;
   };

   const tokenPriceStream = (currencyId) => {
     return `
     subscription {
       Trading {
         Tokens(
           where: {Currency: { Id: {is: "${currencyId}" } }, Interval: {Time: {Duration: {eq: 1}}}}
           limit: {count: 1}
           orderBy: {descending: Block_Time}
         ) {
           Token { Id Symbol Network }
           Price { Ohlc { Close High Low Open } }
         }
       }
     }
     `;
   };

   module.exports = { tokenPriceQuery, tokenPriceStream };
   ```

2. **Import into `index.js`:**

   ```js
   const { tokenPriceQuery, tokenPriceStream } = require("./queries/token-price-query.js");
   ```

3. **Wrap with a function** for queries or streams in `index.js`:

   ```js
   const getTokenPrice = async (token, tokenId) => {
     const query = tokenPriceQuery(tokenId);
     const data = await queryRunner(query, token);
     return data;
   };

   const getTokenPriceStream = (token, tokenId, options = {}) => {
     const subscription = tokenPriceStream(tokenId);
     return streamRunner(subscription, token, options);
   };
   ```

That’s it! Your new query is available to all SDK users.

---

## 🤝 Contributing

1. Fork this repo
2. Create a feature branch
3. Follow the workflow for adding queries
4. Submit a PR 🎉

---

## 📜 License

MIT License. Free to use and modify.

---

👉 Do you want me to also include a **“Planned Queries” section** (like OHLC candles, trades, markets) so contributors know what’s next on the roadmap?
