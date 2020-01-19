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

const Reservation = ({ reservation }) => {
    const {
        uuid,
        hotel_id,
        currency,
        price,
        guest_name,
        room_name,
        arrival_date,
        nights
    } = reservation;

    const checkIn = new Date(arrival_date);
    const chekOut = new Date(arrival_date);
    chekOut.setDate(checkIn.getDate() + nights);

    return (
        <Sleev>
            <GuestName>{guest_name}</GuestName>
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
                {hotel_id}
            </Hotel>
            <Room>
                <Label>Room</Label>
                {room_name}
            </Room>
            <Price>{price}</Price>
        </Sleev>
    );
};

export default Reservation;
