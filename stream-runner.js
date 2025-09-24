// streamRunner.js
const { WebSocket } =  require("ws");

/**
 * Start a Bitquery GraphQL subscription stream.
 * @param {string} subscriptionQuery - GraphQL subscription query.
 * @param {string} token - Bitquery OAuth token.
 * @param {object} options - Optional settings.
 * @param {number} [options.autoCloseMs] - If set, automatically closes the connection after N ms.
 * @param {function} [options.onData] - Callback for subscription data.
 * @param {function} [options.onError] - Callback for errors.
 * @returns {WebSocket} - Active WebSocket connection.
 */
const streamRunner = (subscriptionQuery, token, options = {}) => {
  const {
    autoCloseMs,
    onData = (data) => console.log("Received data:", data),
    onError = (err) => console.error("Bitquery Error:", err),
  } = options;

  const bitqueryConnection = new WebSocket(
    `wss://streaming.bitquery.io/eap?token=${token}`,
    ["graphql-ws"]
  );

  bitqueryConnection.on("open", () => {
    console.log("Connected to Bitquery.");

    // Send initialization message
    bitqueryConnection.send(JSON.stringify({ type: "connection_init" }));
  });

  bitqueryConnection.on("message", (raw) => {
    const response = JSON.parse(raw);

    switch (response.type) {
      case "connection_ack":
        console.log("Connection acknowledged by server.");

        // Send subscription message
        const subscriptionMessage = JSON.stringify({
          type: "start",
          id: "1",
          payload: { query: subscriptionQuery },
        });

        bitqueryConnection.send(subscriptionMessage);
        console.log("Subscription message sent.");

        // Auto-close after timeout (if set)
        if (autoCloseMs) {
          setTimeout(() => {
            console.log(`Closing WebSocket connection after ${autoCloseMs} ms.`);
            bitqueryConnection.close();
          }, autoCloseMs);
        }
        break;

      case "data":
        if (response.payload?.data) {
          onData(response.payload.data);
        }
        break;

      case "ka":
        console.log("Keep-alive message received.");
        break;

      case "error":
        onError(response.payload?.errors || "Unknown error");
        break;

      default:
        console.warn("Unhandled message type:", response.type);
    }
  });

  bitqueryConnection.on("close", () => {
    console.log("Disconnected from Bitquery.");
  });

  bitqueryConnection.on("error", (error) => {
    onError(error);
  });

  return bitqueryConnection;
};


module.exports = {streamRunner};