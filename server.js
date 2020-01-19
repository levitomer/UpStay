import express from 'express';
import routes from '@upstay/routes';
import * as reservationsService from '@upstay/services/reservations';
import serverDev from './server.dev';
import serverIO from './server.io';
import * as db from '@upstay/db/reservations';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 9999;
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
        db.addReservation(reservation);
    });

    const getReservations = async socket => {
        try {
            const res = await axios.get(
                `http://localhost:9999/api/reservations`
            );
            socket.emit('getReservations', res.data);
        } catch (error) {
            console.error(`Error: ${error.code}`);
        }
    };

    getReservations(socket);
    socket.on('disconnect', () => console.log('User disconnected'));
});

server.listen(port, () => {
    console.log(`Server started ${appURL}`);
});
