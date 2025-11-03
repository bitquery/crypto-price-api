
# Contributing to Bitquery Price Feeds SDK

First off, thank you for taking the time to contribute 🎉  
We welcome improvements, bug fixes, and new query SDKs!

---

## 🚀 How to Contribute

1. **Fork the repo [https://github.com/bitquery/crypto-price-api](https://github.com/bitquery/crypto-price-api)** and create your branch from `main`.
2. **Write clear commit messages** following the [Conventional Commits](#-conventional-commits) standard.
3. **Add tests or examples** if you add new functionality.
4. **Open a Pull Request** with a clear description of your changes.

---

## 📝 Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to automate versioning and changelog generation via **semantic-release**.

Your commit messages must be in the following format:

```

<type>\[optional scope]: <description>

\[optional body]

\[optional footer(s)]

````

### Common Types

- `feat:` → A new feature (triggers a **minor** release).
- `fix:` → A bug fix (triggers a **patch** release).
- `docs:` → Documentation only changes.
- `style:` → Code style changes (formatting, no code change).
- `refactor:` → Code change that neither fixes a bug nor adds a feature.
- `test:` → Adding or correcting tests.
- `chore:` → Maintenance tasks.

### Examples

- `feat: add OHLC query support`
- `fix: correct BTC/USDT price formatting`
- `docs: update README with usage example`
- `feat!: drop Node 14 support` → adds a **BREAKING CHANGE** footer and triggers a **major** release.

---

## 🔧 Local Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/bitquery-pricefeeds-sdk.git
   cd bitquery-pricefeeds-sdk
    ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Make sure Husky hooks are enabled:

   ```bash
   npx husky install
   ```

4. Create a feature branch:

   ```bash
   git checkout -b feat/my-new-feature
   ```

5. Run tests / examples as needed.

---

## 🧩 Adding a New Query SDK

1. Create a new file in `queries/` with naming convention:

   ```
   <result-returned>-query.js
   ```

   Example: `ohlc-query.js`

2. Export **both** a query and a stream version:

   ```js
   const ohlcQuery = (currencyId) => `... GraphQL query ...`;
   const ohlcStream = (currencyId) => `... GraphQL subscription ...`;

   module.exports = { ohlcQuery, ohlcStream };
   ```

3. Import into `index.js`:

   ```js
   const { ohlcQuery, ohlcStream } = require("./queries/ohlc-query.js");
   ```

4. Wrap with SDK functions:

   ```js
   const getOHLC = async (token, currencyId) => {
     const query = ohlcQuery(currencyId);
     return await queryRunner(query, token);
   };

   const getOHLCStream = (token, currencyId, options = {}) => {
     const subscription = ohlcStream(currencyId);
     return streamRunner(subscription, token, options);
   };
   ```

5. Add usage examples to the README if relevant.

---

## ✅ Pull Request Checklist

* [ ] Commit messages follow [Conventional Commits](#-conventional-commits).
* [ ] Code builds without errors.
* [ ] Tests/examples added if applicable.
* [ ] Documentation updated (README, comments, or usage).

**Note:** Make sure the commit message starts with either of the `feat:`, `chore:` or `fix:`.
---

## 📦 Release Process

* **Do not bump versions manually.**
* When a PR is merged into `main` and a **GitHub Release** is published,
  [semantic-release](https://semantic-release.gitbook.io/) automatically:

  * Analyzes commits since the last release.
  * Bumps the version (major/minor/patch).
  * Updates `CHANGELOG.md` and `package.json`.
  * Publishes a new version to **npm**.
  * Creates a GitHub Release with notes.

---

Thank you for contributing 💙

```

---

👉 Do you also want me to prepare a matching **PULL_REQUEST_TEMPLATE.md** (auto-applied when someone opens a PR) so contributors are reminded about Conventional Commits, tests, and docs?
```
