import React from 'react';
import SVGUpsay from './svg-upstay';
import { Container, Welcome } from './app.style';

const App = () => {
    return (
        <Container>
            <Welcome>Welcome to</Welcome>
            <SVGUpsay />
        </Container>
    );
};

export default App;
