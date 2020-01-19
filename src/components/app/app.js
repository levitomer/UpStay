import React from 'react';
import SVGUpsay from './svg-upstay';
import Reservations from './Reservations';
import { Container, Welcome, ReservationsSection } from './App.style';
import clientIO from 'socket.io-client';

const socket = clientIO.connect('http://localhost:9999');

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reservations: []
        };
        this.handleGetReservations = this.handleGetReservations.bind(this);
        this.handleNewReservation = this.handleNewReservation.bind(this);
    }

    componentDidMount() {
        socket.on('getReservations', this.handleGetReservations);
        socket.on('newReservation', this.handleNewReservation);
    }

    componentWillUnmount() {
        socket.close();
    }

    handleGetReservations(reservations) {
        this.setState({
            reservations: reservations
        });
    }

    handleNewReservation(reservation) {
        console.log(reservation);
        this.setState({
            reservations: [...this.state.reservations, reservation]
        });
    }

    render() {
        if (!this.state.reservations.length) {
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
                <Reservations reservations={this.state.reservations} />
            </ReservationsSection>
        );
    }
}

export default App;
