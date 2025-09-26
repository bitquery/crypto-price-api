const currencyIdQuery = (address) => {
    return `
    query MyQuery {
        Trading {
            Tokens(where: {Token: {Address: {is: "${address}"}}}, limit: {count: 1}) {
            Currency {
                Id
            }
            }
        }
    }
    `
};

module.exports = {currencyIdQuery};