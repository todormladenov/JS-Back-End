module.exports = (selected) => {
    const options = ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'];

    return options.map(option => {
        return {
            value: option,
            selected: option === selected
        }
    });
}