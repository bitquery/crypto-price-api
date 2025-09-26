const { queryRunner } =  require("./query-runner.js");
const { streamRunner } = require("./stream-runner.js");
const {tokenPriceQuery, tokenPriceStream} = require('./queries/token-price-query.js');
const {currencyIdQuery} = require('./queries/currency-id-query.js');

/**
 * 
 * @param {string} token - your Bitquery OAuth token
 * @param {string} tokenId - the token id, e.g. "bid:bitcoin"
 * @returns {JSON Object} - JSON object that contains the latest price for the respective tokenId
 */
const getTokenPrice = async (token, tokenId) => {
    const query = tokenPriceQuery(tokenId);
    const data = await queryRunner(query, token);
    return data;
}

/**
 * getTokenPriceStream
 * Stream live token price data
 * @param {string} token - your Bitquery OAuth token
 * @param {string} tokenId - the token id, e.g. "bid:bitcoin"
 * @param {object} options - optional settings: { autoCloseMs, onData, onError }
 * @returns {WebSocket} - active WebSocket connection
 */
const getTokenPriceStream = (token, tokenId, options = {}) => {
    const subscription = tokenPriceStream(tokenId);
    return streamRunner(subscription, token, {
      autoCloseMs: options.autoCloseMs,
      onData: options.onData,
      onError: options.onError,
    });
};

/**
 * 
 * @param {String} token - your Bitquery OAuth token
 * @param {String} address - the token address, for example: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" for WETH
 * @returns 
 */
const getCurrencyId = async (token, address) => {
    const query = currencyIdQuery(address);
    const data = await queryRunner(query, token);
    return data.data.Trading.Tokens[0].Currency.Id;
};

module.exports = {getCurrencyId, getTokenPrice, getTokenPriceStream};

/* Usage

(async () => {
    const currencyId = await getCurrencyId("<token address>")
    const data = await getTokenPrice("<Access Token>", currencyId);
    console.log(data);
    }
)();
    
const ws = getTokenPriceStream("<Access Token>", "bid:bitcoin", {
    autoCloseMs: 15000,
    onData: (data) => {
        console.log("Live BTC Price:", JSON.stringify(data, null, 2));
    },
    onError: (err) => {
        console.error("Stream error:", err);
    },
});
*/