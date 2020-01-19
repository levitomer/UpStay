import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { getRootElement } from './utils/dom';
import './index.scss';

ReactDOM.render(<Root />, getRootElement());

if (module.hot) {
    module.hot.accept();
}
