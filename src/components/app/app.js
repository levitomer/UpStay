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
            quotes: {}
        };

        this.handleGetHotels = this.handleGetHotels.bind(this);
        this.handleGetReservations = this.handleGetReservations.bind(this);
        this.handleNewReservation = this.handleNewReservation.bind(this);
        this.handleGetCurrencies = this.handleGetCurrencies.bind(this);
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
        this.handleFilterReservations = this.handleFilterReservations.bind(
            this
        );
        this.handleGetQuotes = this.handleGetQuotes.bind(this);
    }

    componentDidMount() {
        socket.emit('getHotels', this.handleGetHotels);
        socket.emit('getCurrencies', this.handleGetCurrencies);
        socket.emit('getReservations', this.handleGetReservations);
        socket.emit(
            'getQuotes',
            { selectedCurrency: this.state.selectedCurrency },
            this.handleGetQuotes
        );
        socket.on('newReservation', this.handleNewReservation);
    }

    componentDidUpdate(_, prevState) {
        if (this.state.selectedCurrency !== prevState.selectedCurrency) {
            socket.emit(
                'getQuotes',
                { selectedCurrency: this.state.selectedCurrency },
                this.handleGetQuotes
            );
        }
    }
    componentWillUnmount() {
        socket.close();
    }

    handleGetQuotes(quotes) {
        this.setState({
            quotes
        });
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
        this.setState({
            selectedCurrency: selectedCurrency
        });
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
            quotes,
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

        if (!reservations.length || !quotes) {
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
                    quotes={quotes}
                    selectedCurrency={selectedCurrency}
                />
            </ReservationsSection>
        );
    }
}

export default App;
