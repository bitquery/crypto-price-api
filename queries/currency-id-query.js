const currencyIdQuery = async (address, token) => {
    const query = `
    query MyQuery {
        Trading {
            Tokens(where: {Token: {Address: {is: "${address}"}}}, limit: {count: 1}) {
            Currency {
                Id
            }
            }
        }
    }
    `;
    
    const { queryRunner } = require('../query-runner');
    try {
        const data = await queryRunner(query, token);
        
        // Check if we got results and currency ID exists
        if (data?.data?.Trading?.Tokens?.[0]?.Currency?.Id) {
            return data.data.Trading.Tokens[0].Currency.Id;
        }
        
        // Fallback to Bitcoin if no results found
        console.warn(`No currency ID found for address ${address}, using default: bid:bitcoin`);
        return "bid:bitcoin";
    } catch (error) {
        console.error(error);
        // Fallback to Bitcoin on error as well
        console.warn(`Error fetching currency ID for address ${address}, using default: bid:bitcoin`);
        return "bid:bitcoin";
    }
};

module.exports = {currencyIdQuery};