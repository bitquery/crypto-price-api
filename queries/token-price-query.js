const tokenPriceQuery = (currencyId) => {
    return `
    {
      Trading {
        Tokens(
          where: {Currency: { Id: {is: "${currencyId}" } }, Interval: {Time: {Duration: {eq: 1}}}}
          limit: {count: 1}
          orderBy: {descending: Block_Time}
        ) {
          Token {
            Address
            Id
            IsNative
            Name
            Network
            Symbol
            TokenId
          }
          Block {
            Date
            Time
            Timestamp
          }
          Interval {
            Time {
              Start
              Duration
              End
            }
          }
          Volume {
            Base
            Quote
            Usd
          }
          Price {
            IsQuotedInUsd
            Ohlc {
              Close
              High
              Low
              Open
            }
            Average {
              ExponentialMoving
              Mean
              SimpleMoving
              WeightedSimpleMoving
            }
          }
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
          Token {
            Address
            Id
            IsNative
            Name
            Network
            Symbol
            TokenId
          }
          Block {
            Date
            Time
            Timestamp
          }
          Interval {
            Time {
              Start
              Duration
              End
            }
          }
          Volume {
            Base
            Quote
            Usd
          }
          Price {
            IsQuotedInUsd
            Ohlc {
              Close
              High
              Low
              Open
            }
            Average {
              ExponentialMoving
              Mean
              SimpleMoving
              WeightedSimpleMoving
            }
          }
        }
      }
    }
    `;
  };
  
module.exports = { tokenPriceQuery, tokenPriceStream };
  