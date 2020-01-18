import React from 'react';
import { Container } from './app.style';
import { Reservation } from './Reservation';

class Reservations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reservations: []
        };
    }
    componentDidMount() {}

    render() {
        return (
            <Container>
                {this.state.reservations.map(reservation => (
                    <Reservation reservation={reservation} />
                ))}
            </Container>
        );
    }
}

export default Reservations;
