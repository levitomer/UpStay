import { query } from './pg';
import EventEmitter from 'events';

const emitter = new EventEmitter();

export const getReservations = async (request, response) => {
    try {
        await query('SELECT * FROM reservations', (error, results) => {
            if (error) {
                throw error;
            }
            emitter.emit('getReservations', response.json(results.rows));
            response.status(200);
        });
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

export const addReservation = async reservation => {
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

    try {
        await query(
            'INSERT INTO reservations (uuid, hotel_id, currency, price, guest_name, room_name, arrival_date, nights) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [
                uuid,
                hotel_id,
                currency,
                price,
                guest_name,
                room_name,
                arrival_date,
                nights
            ],
            (error, results) => {
                if (error) {
                    throw error;
                }

                response
                    .status(201)
                    .send(`Reservation added with ID: ${results.insertId}`);
            }
        );
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};
