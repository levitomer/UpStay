import React from 'react';
import SVGUpsay from './svg-upstay';
import Reservations from './Reservations';
import SelectCurrency from './SelectCurrency';
import { Container, Welcome, ReservationsSection } from './App.style';
import clientIO from 'socket.io-client';
import axios from 'axios';

const access_key = 'c8b57b494662b67e04c0fd31bf3830c2';
const socket = clientIO.connect('http://localhost:8081');

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hotels: [],
            reservations: [],
            currencies: [],
            selectedCurrency: 'USD',
            currencyQuote: 3.45
        };

        this.handleGetHotels = this.handleGetHotels.bind(this);
        this.handleGetReservations = this.handleGetReservations.bind(this);
        this.handleNewReservation = this.handleNewReservation.bind(this);
        this.handleGetCurrencies = this.handleGetCurrencies.bind(this);
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
    }

    componentDidMount() {
        socket.emit('getHotels', this.handleGetHotels);
        socket.emit('getCurrencies', this.handleGetCurrencies);
        socket.emit('getReservations', this.handleGetReservations);
        socket.on('newReservation', this.handleNewReservation);
    }

    componentWillUnmount() {
        socket.close();
    }

    handleGetHotels(hotels) {
        this.setState({
            hotels
        });
    }

    handleGetCurrencies(currencies) {
        this.setState({
            currencies
        });
    }

    handleChangeCurrency(selectedCurrency) {
        axios
            .get(
                `http://api.currencylayer.com/live?access_key=${access_key}&currencies=${selectedCurrency}`
            )
            .then(response => {
                const quote = Object.values(response.data.quotes)[0];
                this.setState({
                    currencyQuote: quote
                });
            })
            .catch(error => console.log(error));
    }

    handleGetReservations(reservations) {
        this.setState({
            reservations
        });
    }

    handleNewReservation(reservation) {
        this.setState({
            reservations: [...this.state.reservations, reservation]
        });
    }

    render() {
        const {
            reservations,
            currencies,
            selectedCurrency,
            currencyQuote,
            hotels
        } = this.state;

        if (!reservations.length || !currencies.length || !hotels.length) {
            return (
                <Container>
                    <Welcome>Welcome to</Welcome>
                    <SVGUpsay />
                </Container>
            );
        }
        return (
            <ReservationsSection>
                <SVGUpsay />
                <Welcome>Reservations</Welcome>
                <SelectCurrency
                    currencies={currencies}
                    onChangeCurrency={this.handleChangeCurrency}
                    selectedCurrency={selectedCurrency}
                />
                <Reservations
                    hotels={hotels}
                    reservations={reservations}
                    currencyQuote={currencyQuote}
                    selectedCurrency={selectedCurrency}
                />
            </ReservationsSection>
        );
    }
}

export default App;
