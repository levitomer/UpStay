import React from 'react';
import ReactTooltip from 'react-tooltip';
import getSymbolFromCurrency from 'currency-symbol-map';
import {
    Card,
    Label,
    Value,
    Uuid,
    CheckIn,
    CheckOut,
    Hotel,
    Room,
    Price
} from './App.style';

const Reservation = ({ reservation, hotels, selectedCurrency, price }) => {
    const { uuid, hotel_id, room_name, arrival_date, nights } = reservation;
    const dateFormat = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };
    const checkIn = new Date(arrival_date);
    const chekOut = new Date(arrival_date);
    chekOut.setDate(checkIn.getDate() + nights);
    const hotel = hotels.find(({ id }) => hotel_id === id);

    return (
        <Card>
            <Uuid>{uuid}</Uuid>
            <CheckIn>
                <Label>Check-in</Label>
                <Value>{checkIn.toLocaleDateString('en-GB', dateFormat)}</Value>
            </CheckIn>
            <CheckOut>
                <Label>Check-out</Label>
                <Value>{chekOut.toLocaleDateString('en-GB', dateFormat)}</Value>
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
                {!price ? '' : price} {getSymbolFromCurrency(selectedCurrency)}
            </Price>
            <ReactTooltip />
        </Card>
    );
};

export default Reservation;
