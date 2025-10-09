# Crypto Price SDKs

📊 A lightweight SDK to fetch and stream crypto price data from [Bitquery](https://ide.bitquery.io) using its [Trading APIs](https://docs.bitquery.io/docs/category/crypto-price-apis/).
This project provides wrappers around Bitquery GraphQL queries and subscriptions so developers can easily get **real-time prices, historical data, and token information**.

---

## 🚀 Features

- Get the latest token price in USD
- Stream live token price updates
- Get price change percentage for ROI calculations
- Convert token addresses into `currencyId` for queries
- Extendable query SDK workflow for adding new APIs
- Open source & developer-friendly

## List of Chains Supported

- [Etheruem](https://docs.bitquery.io/docs/blockchain/Ethereum/)
- [BSC](https://docs.bitquery.io/docs/blockchain/BSC/)
- [Solana](https://docs.bitquery.io/docs/blockchain/Solana/)
- [Tron](https://docs.bitquery.io/docs/blockchain/Tron/)
- [Polygon](https://docs.bitquery.io/docs/blockchain/Matic/)
- [Base](https://docs.bitquery.io/docs/blockchain/Base/)

---

## 📦 Installation

```bash
npm install bitquery-crypto-price
```

---

## Access Token

Get Your Bitquery Access Token [here](https://account.bitquery.io/user/api_v2/access_tokens)

---

## ⚡ Quick Start

### 1. Get the latest price for a token

```js
const { getTokenPrice } = require("@bitquery/pricefeeds");

(async () => {
  const data = await getTokenPrice("<Access Token>", "TOKEN ADDRESS");
  console.log(data);
})();
```

---

### 2. Stream live token price updates

```js
const { getTokenPriceStream } = require("@bitquery/pricefeeds");

const ws = getTokenPriceStream("<Access Token>", "TOKEN ADDRESS", {
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

### 3. Get 5-min price change of a token

```js
const { getPriceChange } = require("@bitquery/pricefeeds");

(async () => {
  const data = await getPriceChange("<Access Token>", "CURRENCY_ID");
  console.log( JSON.stringify(data, null, 2));
})();
```

---

### 4. Stream live price change updates

```js
const { getPriceChangeStream } = require("@bitquery/pricefeeds");

const ws = getPriceChangeStream("<Access Token>", "CURRENCY_ID", {
  autoCloseMs: 30000, // optional: auto-close after 30 seconds
  onData: (data) => {
    console.log("Live price changes:", JSON.stringify(data, null, 2));
  },
  onError: (err) => {
    console.error("Stream error:", err);
  },
});

// ws.close() // manually close if needed
```

---

## 🛠️ Available Functions

| Function                | Description                                                   |
| ----------------------- | ------------------------------------------------------------- |
| `getCurrencyId`         | Get `currencyId` from a token address (required for queries)  |
| `getTokenPrice`         | Fetch the latest token price (point-in-time query)            |
| `getTokenPriceStream`   | Subscribe to real-time token price updates (WebSocket stream) |
| `getPriceChange`        | Get top tokens by price change percentage (point-in-time query) |
| `getPriceChangeStream`  | Subscribe to real-time price change updates (WebSocket stream) |

---

## 🧩 Extending the SDK (Adding New Queries)

To add support for more Trading APIs (e.g., OHLC candles, trades, liquidity pools):

### Workflow

1. **Create a new query file** in `queries/` with naming convention:
   `<result-returned>-query.js`
   Example: `sample-query.js`

   ```js
   const sampleQuery = (currencyId) => {
     return `
     <Your GraphQL Query>
     `;
   };

   const sampleStream = (currencyId) => {
     return `
     <Your GraphQL Subscription>
     `;
   };

   module.exports = { sampleQuery, sampleStream };
   ```

2. **Import into `index.js`:**

   ```js
   const { sampleQuery, sampleStream } = require("./queries/sample-query.js");
   ```

3. **Wrap with a function** for queries or streams in `index.js`:

   ```js
   const getSample = async (token, tokenId) => {
     const query = sampleQuery(tokenId);
     const data = await queryRunner(query, token);
     return data;
   };

   const getSample = (token, tokenId, options = {}) => {
     const subscription = sampleStream(tokenId);
     return streamRunner(subscription, token, options);
   };
   ```

That’s it! Your new query is available to all SDK users after PR merge and release.

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

## Contact

Contact our team via [Telegram](https://t.me/Bloxy_info) for any support.
