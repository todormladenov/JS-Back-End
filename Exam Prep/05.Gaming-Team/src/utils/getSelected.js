exports.getSelectedOption = (selectedOption) => {
    const options = ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'];

    const result = options.map(option => {
        return {
            value: option,
            selected: option == selectedOption
        }
    });

    return result;
};