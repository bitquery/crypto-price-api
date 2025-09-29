const { queryRunner } =  require("./query-runner.js");
const { streamRunner } = require("./stream-runner.js");
const {tokenPriceQuery, tokenPriceStream} = require('./queries/token-price-query.js');
const {currencyIdQuery} = require('./queries/currency-id-query.js');

/**
 * 
 * @param {string} token - your Bitquery OAuth token
 * @param {string} address - the token address, e.g. "0x4d15a3a2286d883af0aa1b3f21367843fac63e07" for WETH
 * @returns {JSON Object} - JSON object that contains the latest price for the respective token
 */
const getTokenPrice = async (token, address) => {
    try {
        // First fetch the currency ID using the address
        const currencyId = await currencyIdQuery(address, token);
        console.log("Fetched currencyId:", currencyId);
        // Then fetch the token price using the currency ID
        const query = tokenPriceQuery(currencyId);
        const data = await queryRunner(query, token);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * getTokenPriceStream
 * Stream live token price data
 * @param {string} token - your Bitquery OAuth token
 * @param {string} address - the token address, e.g. "0x4d15a3a2286d883af0aa1b3f21367843fac63e07" for WETH
 * @param {object} options - optional settings: { autoCloseMs, onData, onError }
 * @returns {Promise<WebSocket>} - active WebSocket connection
 */
const getTokenPriceStream = async (token, address, options = {}) => {
    try {
        // First fetch the currency ID using the address
        const currencyId = await currencyIdQuery(address, token);
        console.log("Fetched currencyId:", currencyId);
        // Then start the stream using the currency ID
        const subscription = tokenPriceStream(currencyId);
        return streamRunner(subscription, token, {
          autoCloseMs: options.autoCloseMs,
          onData: options.onData,
          onError: options.onError,
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * 
 * @param {String} token - your Bitquery OAuth token
 * @param {String} address - the token address, for example: "0x4d15a3a2286d883af0aa1b3f21367843fac63e07" for WETH
 * @returns 
 */
const getCurrencyId = async (token, address) => {
    try {
        return await currencyIdQuery(address, token);
    } catch (error) {
        console.error(error);
    }
};

module.exports = {getCurrencyId, getTokenPrice, getTokenPriceStream};

/* Usage

// Get token price using address
(async () => {
    const data = await getTokenPrice("<Access Token>", "0x4d15a3a2286d883af0aa1b3f21367843fac63e07");
    console.log(data);
})();

// Stream token price using address
(async () => {
    const ws = await getTokenPriceStream("<Access Token>", "0x4d15a3a2286d883af0aa1b3f21367843fac63e07", {
        autoCloseMs: 15000,
        onData: (data) => {
            console.log("Live Token Price:", JSON.stringify(data, null, 2));
        },
        onError: (err) => {
            console.error("Stream error:", err);
        },
    });
})();

// Get currency ID only (if needed separately)
(async () => {
    const currencyId = await getCurrencyId("<Access Token>", "0x4d15a3a2286d883af0aa1b3f21367843fac63e07");
    console.log(currencyId);
})();
*/