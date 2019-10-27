import React from 'react';
import { Square } from './square';

export class Board extends React.Component {
    array = Array(9).fill(null);
    renderSquare(i, higthLight) {
        return (<Square value={this.props.squares[i]} key={i}
            onClick={() => this.props.onClick(i)} higthLight={higthLight} />
        );
    }

    render() {
        const data = Array(3).fill(null).map((_, i) => (
            <div className="board-row" key={i}>
                {Array(3).fill(null).map((_, k) => this.renderSquare((i * 3) + k, this.props.higthLights.includes((i * 3) + k)))}
            </div>
        ));
        return data;
    }
}
