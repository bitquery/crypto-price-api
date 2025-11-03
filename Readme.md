# Crypto Price API

📊 Crypto Price API is a lightweight suite of API provided by [Bitquery](https://ide.bitquery.io?utm_source=github&utm_medium=repo&utm_campaign=crypto-price-api) to fetch and stream live cryptocurrency prices, historical data, and token analytics across multiple blockchains, using its [Trading API Endpoints](https://docs.bitquery.io/docs/category/crypto-price-apis?utm_source=github&utm_medium=repo&utm_campaign=crypto-price-api).

---

## What is Crypto Price API?

A **Crypto Price API** allows developers to access real-time and historical cryptocurrency prices programmatically. Bitquery’s Crypto Price API provides data for tokens across chains like Ethereum, Solana, BSC, Polygon, and Tron — all through simple GraphQL queries or WebSocket streams.

---

## 🚀 Crypto Price API Features

- Get the latest token price in USD
- Stream live token price updates
- Get price change percentage for ROI calculations
- Get token volume data with configurable time intervals
- Stream live token volume updates
- Convert token addresses into `currencyId` for queries
- Extendable query SDK workflow for adding new APIs
- Open source & developer-friendly

## List of Chains Supported by Crypto Price API

- [Ethereum](https://docs.bitquery.io/docs/blockchain/Ethereum?utm_source=github&utm_medium=repo&utm_campaign=crypto-price-api)
- [BSC](https://docs.bitquery.io/docs/blockchain/BSC?utm_source=github&utm_medium=repo&utm_campaign=crypto-price-api)
- [Solana](https://docs.bitquery.io/docs/blockchain/Solana?utm_source=github&utm_medium=repo&utm_campaign=crypto-price-api)
- [Tron](https://docs.bitquery.io/docs/blockchain/Tron?utm_source=github&utm_medium=repo&utm_campaign=crypto-price-api)
- [Polygon](https://docs.bitquery.io/docs/blockchain/Matic?utm_source=github&utm_medium=repo&utm_campaign=crypto-price-api)
- [Base](https://docs.bitquery.io/docs/blockchain/Base?utm_source=github&utm_medium=repo&utm_campaign=crypto-price-api)

---

## 📦 Installation

```bash
npm install bitquery-crypto-price
```

---

## Access Token

Get Your Bitquery Access Token [here](https://account.bitquery.io/user/api_v2/access_tokens?utm_source=github&utm_medium=repo&utm_campaign=crypto-price-api)

---

## ⚡ Quick Start for Crypto Price API

### 1. Get the latest price for a token

```js
const { getTokenPrice } = require("bitquery-crypto-price");

(async () => {
  const data = await getTokenPrice("<Access Token>", "TOKEN ADDRESS");
  console.log(data);
})();
```

---

### 2. Stream live token price updates

```js
const { getTokenPriceStream } = require("bitquery-crypto-price");

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
const { getPriceChange } = require("bitquery-crypto-price");

(async () => {
  const data = await getPriceChange("<Access Token>", "CURRENCY_ID");
  console.log( JSON.stringify(data, null, 2));
})();
```

---

### 4. Stream live price change updates

```js
const { getPriceChangeStream } = require("bitquery-crypto-price");

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

### 5. Get token volume data

```js
const { getTokenVolume } = require("bitquery-crypto-price");

(async () => {
  const data = await getTokenVolume("<Access Token>", "TOKEN ADDRESS", 3600); // 3600 = 1 hour interval
  console.log(JSON.stringify(data, null, 2));
})();
```

---

### 6. Stream live token volume updates

```js
const { getTokenVolumeStream } = require("bitquery-crypto-price");

const ws = getTokenVolumeStream("<Access Token>", "TOKEN ADDRESS", {
  interval: 3600, // optional: time interval in seconds (default: 3600)
  autoCloseMs: 30000, // optional: auto-close after 30 seconds
  onData: (data) => {
    console.log("Live token volume:", JSON.stringify(data, null, 2));
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
| `getTokenVolume`        | Fetch token volume data (point-in-time query)                 |
| `getTokenVolumeStream`  | Subscribe to real-time token volume updates (WebSocket stream) |

---

## 🧩 Extending the Crypto Price API (Adding New Queries and Streams)

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

1. Fork this repo [https://github.com/bitquery/crypto-price-api](https://github.com/bitquery/crypto-price-api)
2. Create a feature branch
3. Follow the workflow for adding queries
4. Submit a PR 🎉
5. Make sure to follow the [Contribution Guidelines](https://github.com/bitquery/crypto-price-api?tab=contributing-ov-file)

---

## 📜 License

MIT License. Free to use and modify.

---

## Contact

Contact our team via [Telegram](https://t.me/Bloxy_info?utm_source=github&utm_medium=repo&utm_campaign=crypto-price-api) for any support.
Fill out [this](https://bitquery.io/forms/api?utm_source=github&utm_medium=repo&utm_campaign=crypto-price-api) form, if you are interested in purchasing any product or service from Bitquery.
