import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Game } from './tic-tac-toe/container/tic-tac-toe';

// ========================================
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);