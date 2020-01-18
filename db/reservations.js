import { query } from './pg';

export const getReservations = async (request, response) => {
    query('SELECT * FROM reservations', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
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
    query(
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
};
