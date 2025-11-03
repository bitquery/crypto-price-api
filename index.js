const { queryRunner } =  require("./query-runner.js");
const { streamRunner } = require("./stream-runner.js");
const {tokenPriceQuery, tokenPriceStream} = require('./queries/token-price-query.js');
const {priceChangeQuery, priceChangeStream} = require('./queries/price-change-query.js');
const {currencyIdQuery} = require('./queries/currency-id-query.js');
const {tokenVolumeQuery, tokenVolumeStream, multipleTokenVolumeQuery, multipleTokenVolumeStream} = require('./queries/token-volume-query.js');

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

/**
 * getPriceChange
 * Get price change data for tokens
 * @param {string} token - your Bitquery OAuth token
 * @param {string} address - the token address, e.g. "0x4d15a3a2286d883af0aa1b3f21367843fac63e07"
 * @returns {JSON Object} - JSON object that contains price change data for tokens
 */
const getPriceChange = async (token, address, interval = 300) => {
    try {
        // First fetch the currency ID using the address
        const currencyId = await currencyIdQuery(address, token);
        console.log("Fetched currencyId for price change:", currencyId);
        // Then fetch the price change data using the currency ID
        const query = priceChangeQuery(currencyId, interval);
        const data = await queryRunner(query, token);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * getPriceChangeStream
 * Stream live price change data
 * @param {string} token - your Bitquery OAuth token
 * @param {string} address - the token address, e.g. "0x4d15a3a2286d883af0aa1b3f21367843fac63e07"
 * @param {object} options - optional settings: { autoCloseMs, onData, onError }
 * @returns {Promise<WebSocket>} - active WebSocket connection
 */
const getPriceChangeStream = async (token, address, interval = 300, options = {}) => {
    try {
        // First fetch the currency ID using the address
        const currencyId = await currencyIdQuery(address, token);
        console.log("Fetched currencyId for price change stream:", currencyId);
        // Then start the stream using the currency ID
        const subscription = priceChangeStream(currencyId, interval);
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
 * getTokenVolume
 * Get token volume data
 * @param {string} token - your Bitquery OAuth token
 * @param {string} address - the token address, e.g. "0x4d15a3a2286d883af0aa1b3f21367843fac63e07" for WETH
 * @param {number} interval - time interval in seconds (default: 3600)
 * @returns {JSON Object} - JSON object that contains the token volume data
 */
const getTokenVolume = async (token, address, interval = 3600) => {
    try {
        const query = tokenVolumeQuery(address, interval);
        const data = await queryRunner(query, token);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getMultipleTokenVolume = async (token, addresses, interval = 3600) => {
    try {
        const query = multipleTokenVolumeQuery(addresses, interval);
        const data = await queryRunner(query, token);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
/**
 * getTokenVolumeStream
 * Stream live token volume data
 * @param {string} token - your Bitquery OAuth token
 * @param {string} address - the token address, e.g. "0x4d15a3a2286d883af0aa1b3f21367843fac63e07" for WETH
 * @param {object} options - optional settings: { interval, autoCloseMs, onData, onError }
 * @returns {Promise<WebSocket>} - active WebSocket connection
 */
const getTokenVolumeStream = async (token, address, options = {}) => {
    try {
        const interval = options.interval || 3600;
        const subscription = tokenVolumeStream(address, interval);
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

const getMultipleTokenVolumeStream = async (token, addresses, options = {}) => {
    try {
        const interval = options.interval || 3600;
        const subscription = multipleTokenVolumeStream(addresses, interval);
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

module.exports = {getCurrencyId, getTokenPrice, getTokenPriceStream, getPriceChange, getPriceChangeStream, getTokenVolume, getTokenVolumeStream, getMultipleTokenVolume, getMultipleTokenVolumeStream};

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
