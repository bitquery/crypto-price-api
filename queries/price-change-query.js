const priceChangeQuery = (currencyId, interval) => {
    return `
    {
      Trading {
        Tokens(
         orderBy: {descending: Interval_Time_Start}
        limit: {count: 1}
          where: {Price: {IsQuotedInUsd: true}, Volume: {Usd: {gt: 100000}}, Interval: {Time: {Duration: {eq: ${interval}}}}, Currency: {Id: {is: "${currencyId}"}}}
        ) {
          Token {
            Address
            Did
            Id
            IsNative
            Name
            Network
            Symbol
            TokenId
          }
          Currency {
            Symbol
            Id
            Name
          }
          Interval {
            VolumeBased
            Time {
              Start
              End
              Duration
            }
          }
          Volume {
            Base
            BaseAttributedToUsd
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
              Estimate
              ExponentialMoving
              Mean
              SimpleMoving
              WeightedSimpleMoving
            }
          }
          diff: calculate(expression: "Price_Ohlc_Close - Price_Ohlc_Open")
          change: calculate(expression: "round(($diff / Price_Ohlc_Open), 3) * 100")
        }
      }
    }
    `;
  };
  
  const priceChangeStream = (currencyId, interval) => {
    return `
    subscription {
      Trading {
        Tokens(
          where: {Price: {IsQuotedInUsd: true}, Volume: {Usd: {gt: 100000}}, Interval: {Time: {Duration: {eq: ${interval}}}}, Currency: {Id: {is: "${currencyId}"}}}
        ) {
          Token {
            Address
            Did
            Id
            IsNative
            Name
            Network
            Symbol
            TokenId
          }
          Currency {
            Symbol
            Id
            Name
          }
          Interval {
            VolumeBased
            Time {
              Start
              End
              Duration
            }
          }
          Volume {
            Base
            BaseAttributedToUsd
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
              Estimate
              ExponentialMoving
              Mean
              SimpleMoving
              WeightedSimpleMoving
            }
          }
          diff: calculate(expression: "Price_Ohlc_Close - Price_Ohlc_Open")
          change: calculate(expression: "round(($diff / Price_Ohlc_Open), 3) * 100")
        }
      }
    }
    `;
  };
  
module.exports = { priceChangeQuery, priceChangeStream };
  
