import React from 'react';
import SVGUpsay from './svg-upstay';
import { Container, Welcome, ReservationSection } from './App.style';
import Reservation from './Reservation';

class Reservations extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            reservations,
            hotels,
            selectedCurrency,
            currencyQuote
        } = this.props;

        if (!reservations) {
            return (
                <Container>
                    <Welcome>Loading Reservations</Welcome>
                    <SVGUpsay />
                </Container>
            );
        }
        return (
            <ReservationSection>
                {reservations.map(reservation => (
                    <Reservation
                        key={reservation.id}
                        hotels={hotels}
                        currencyQuote={currencyQuote}
                        selectedCurrency={selectedCurrency}
                        reservation={reservation}
                    />
                ))}
            </ReservationSection>
        );
    }
}

export default Reservations;
