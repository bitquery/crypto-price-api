const tokenVolumeQuery = (address, interval) => {
    return `
    {
        Trading {
            Tokens(
            where: {Interval: {Time: {Duration: {eq: ${interval}}}}, Token: {Address: {is: "${address}"}}}
            orderBy: {descending: Block_Time}
            limit: {count: 1}
            ) {
            Token {
                Address
                Id
                IsNative
                Name
                Network
                Name
                Symbol
                TokenId
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
            }
        }
    }
    `
}

const tokenVolumeStream = (address, interval) => {
    return `
    subscription{
        Trading {
            Tokens(
            where: {Interval: {Time: {Duration: {eq: ${interval}}}}, Token: {Address: {is: "${address}"}}}
            ) {
            Token {
                Address
                Id
                IsNative
                Name
                Network
                Name
                Symbol
                TokenId
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
            }
        }
    }
    `
}

module.exports = { tokenVolumeQuery, tokenVolumeStream };