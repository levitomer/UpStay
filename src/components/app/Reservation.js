import React from 'react';
import ReactTooltip from 'react-tooltip';

import {
    Sleev,
    Label,
    Value,
    Field,
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
                <Value>{checkIn.toLocaleDateString()}</Value>
            </CheckIn>
            <CheckOut>
                <Label>Check-out</Label>
                <Value>{chekOut.toLocaleDateString()}</Value>
            </CheckOut>
            <Hotel>
                <Label>Hotel</Label>
                <Value data-tip={hotel.name}>{hotel.name}</Value>
            </Hotel>
            <Room>
                <Label>Room</Label>
                <Value data-tip={room_name}>{room_name}</Value>
            </Room>
            <Price>
                {convertedPrice} {selectedCurrency}
            </Price>
            <ReactTooltip />
        </Sleev>
    );
};

export default Reservation;
