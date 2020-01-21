import React from 'react';

import {
    Sleev,
    Label,
    GuestName,
    Uuid,
    CheckIn,
    CheckOut,
    Hotel,
    Room,
    Price
} from './App.style';

const Reservation = ({
    reservation,
    hotels,
    selectedCurrency,
    currencyQuote
}) => {
    const {
        uuid,
        hotel_id,
        price,
        room_name,
        arrival_date,
        nights
    } = reservation;

    const checkIn = new Date(arrival_date);
    const chekOut = new Date(arrival_date);
    chekOut.setDate(checkIn.getDate() + nights);
    const convertedPrice = Math.floor((price / currencyQuote) * 100) / 100;
    const hotel = hotels.find(({ id }) => hotel_id === id);

    return (
        <Sleev>
            <Uuid>{uuid}</Uuid>
            <CheckIn>
                <Label>Check-in</Label>
                {checkIn.toLocaleDateString()}
            </CheckIn>
            <CheckOut>
                <Label>Check-out</Label>
                {chekOut.toLocaleDateString()}
            </CheckOut>
            <Hotel>
                <Label>Hotel</Label>
                {hotel.name}
            </Hotel>
            <Room>
                <Label>Room</Label>
                {room_name}
            </Room>
            <Price>
                {convertedPrice} {selectedCurrency}
            </Price>
        </Sleev>
    );
};

export default Reservation;
