import React from 'react';
import { ReservationSection } from './App.style';
import Reservation from './Reservation';

const Reservations = ({ reservations, hotels, quotes, selectedCurrency }) => {
    return (
        <ReservationSection>
            {reservations.map(reservation => {
                const { price, currency } = reservation;
                const symbols = `${selectedCurrency}${currency.toUpperCase()}`;
                const quote = quotes[symbols];
                const convertedPrice = Math.floor(price * quote * 100) / 100;
                return (
                    <Reservation
                        key={reservation.uuid}
                        hotels={hotels}
                        price={convertedPrice}
                        selectedCurrency={selectedCurrency}
                        reservation={reservation}
                    />
                );
            })}
        </ReservationSection>
    );
};

export default Reservations;
