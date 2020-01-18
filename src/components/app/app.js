import React from 'react';
import SVGUpsay from './svg-upstay';
// import Reservations from './Reservations';
import { Container, Welcome } from './app.style';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router';
import socketIOClient from 'socket.io-client';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: false,
            endpoint: 'http://localhost:9999'
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('connection');
    }
    render() {
        return (
            // <Router>
            //     <ul>
            //         <li>
            //             <Link to="/">Home</Link>
            //         </li>
            //         <li>
            //             <Link to="/reservations">Reservations</Link>
            //         </li>
            //     </ul>
            //     <Switch>
            //         <Route exact path="/">

            //         </Route>
            //         <Route path="/reservations">
            //             <Container>
            //                 <Reservations />
            //             </Container>
            //         </Route>
            //     </Switch>
            // </Router>
            <Container>
                <Welcome>Welcome to</Welcome>
                <SVGUpsay />
            </Container>
        );
    }
}

export default App;
