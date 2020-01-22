import React from 'react';
import SVGUpsay from './svg-upstay';
import Reservations from './Reservations';
import FilterReservations from './FilterReservations';
import SelectCurrency from './SelectCurrency';
import ReservationLoader from './ReservationLoader';
import {
    Container,
    Welcome,
    Span,
    ReservationsSection,
    ToolBar
} from './App.style';
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
            selectedUuid: null,
            currencies: [],
            selectedCurrency: 'USD',
            currencyQuote: 3.45
        };

        this.handleGetHotels = this.handleGetHotels.bind(this);
        this.handleGetReservations = this.handleGetReservations.bind(this);
        this.handleNewReservation = this.handleNewReservation.bind(this);
        this.handleGetCurrencies = this.handleGetCurrencies.bind(this);
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
        this.handleFilterReservations = this.handleFilterReservations.bind(
            this
        );
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
                    currencyQuote: quote,
                    selectedCurrency: selectedCurrency
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

    handleFilterReservations(selectedUuid) {
        this.setState({ selectedUuid });
    }

    render() {
        const {
            reservations,
            currencies,
            selectedUuid,
            selectedCurrency,
            currencyQuote,
            hotels
        } = this.state;

        const loading = !currencies.length || !hotels.length;

        if (loading) {
            return (
                <Container>
                    <Welcome>
                        <Span>Welcome to</Span>
                        <SVGUpsay />
                    </Welcome>
                </Container>
            );
        }

        if (!reservations.length) {
            return (
                <ReservationsSection>
                    <SVGUpsay />
                    <Welcome>Reservations</Welcome>
                    {Array(10)
                        .fill()
                        .map((_, i) => (
                            <ReservationLoader key={i} />
                        ))}
                </ReservationsSection>
            );
        }

        return (
            <ReservationsSection>
                <SVGUpsay />
                <Welcome>Reservations</Welcome>
                <ToolBar>
                    <FilterReservations
                        onFilterReservations={this.handleFilterReservations}
                    />
                    <SelectCurrency
                        currencies={currencies}
                        onChangeCurrency={this.handleChangeCurrency}
                        selectedCurrency={selectedCurrency}
                    />
                </ToolBar>
                <Reservations
                    hotels={hotels}
                    reservations={
                        selectedUuid
                            ? reservations.filter(({ uuid }) =>
                                  uuid.startsWith(selectedUuid)
                              )
                            : reservations
                    }
                    currencyQuote={currencyQuote}
                    selectedCurrency={selectedCurrency}
                />
            </ReservationsSection>
        );
    }
}

export default App;
