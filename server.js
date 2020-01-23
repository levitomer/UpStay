import express from 'express';
import routes from '@upstay/routes';
import * as reservationsService from '@upstay/services/reservations';
import * as currenciesService from '@upstay/services/currencies';
import serverDev from './server.dev';
import serverIO from './server.io';
import * as db from '@upstay/db/reservations';

const app = express();
const port = process.env.PORT || 8081;
const appURL = `http://localhost:${port}`;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(routes);

serverDev(app);

// socket.io server
const server = serverIO(app, socket => {
    const { id } = socket.client;

    console.log(`User connected: ${id}`);
    reservationsService.start(reservation => {
        socket.emit('newReservation', reservation);
        db.addReservation(reservation);
    });

    socket.on('getHotels', db.getHotels);
    socket.on('getCurrencies', db.getCurrencies);
    socket.on('getReservations', db.getReservations);
    socket.on('getQuotes', ({ selectedCurrency }, quotes) =>
        currenciesService.getQuotes(selectedCurrency, quotes)
    );

    socket.on('disconnect', () => {
        reservationsService.stop();
        db.cleanReservations();
    });
});

server.listen(port, () => {
    console.log(`Server started ${appURL}`);
});
