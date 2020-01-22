import { query } from './pg';

export const getCurrencies = async currencies => {
    try {
        await query('SELECT enum_range(NULL::currency)', (error, results) => {
            if (error) {
                throw error;
            }

            const enums = results.rows[0].enum_range;
            const json = JSON.stringify(enums);
            const currencySymbols = json.replace(/[{}"]/g, '').toUpperCase();
            const currenciesMap = currencySymbols.split(',');

            currencies(currenciesMap);
        });
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

export const getHotels = async hotels => {
    try {
        await query('SELECT * FROM hotels', (error, results) => {
            if (error) {
                throw error;
            }

            hotels(results.rows);
        });
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

export const getReservations = async reservations => {
    try {
        await query('SELECT * FROM reservations', (error, results) => {
            if (error) {
                throw error;
            }
            reservations(results.rows);
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

export const cleanReservations = async () => {
    try {
        await query('DELETE FROM reservations', (error, _) => {
            if (error) {
                throw error;
            }
        });
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};
