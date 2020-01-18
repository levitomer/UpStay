import http from 'http';
import socketIO from 'socket.io';

export default (app, onConnectionCallback) => {
    const server = http.Server(app);
    const io = socketIO(server);

    io.on('connection', onConnectionCallback);

    io.on('error', function(err) {
        console.log('received error from client:', io.id);
        console.log(err);
    });
    return server;
};
