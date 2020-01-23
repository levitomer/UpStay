import axios from 'axios';

const CURRENCY_LAYER_ACCESS_KEY = 'c8b57b494662b67e04c0fd31bf3830c2';

export const getQuotes = async (selectedCurrency = 'USD', quotes) => {
    try {
        await axios
            .get(
                `http://api.currencylayer.com/live?access_key=${CURRENCY_LAYER_ACCESS_KEY}&source=${selectedCurrency}`
            )
            .then(response => {
                quotes(response.data.quotes);
            });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};
