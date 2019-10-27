import React from 'react';
import { Board } from '../components/board';
import { ticTacToeService } from '../services/tic-tac-toe.service';
import { Sort } from '../components/sort';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{ squares: Array(9).fill(null) }],
            xIsNext: true,
            stepNumber: 0,
            isOrderAsc: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = [...current.squares];
        if (ticTacToeService.calculateWinner(squares) || squares[i]) return;
        const xIsNext = this.state.xIsNext;
        squares[i] = xIsNext ? 'X' : 'O';
        this.setState({
            history: [...history, { squares }],
            xIsNext: !xIsNext,
            stepNumber: history.length
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    get Moves() {
        const history = this.state.history;
        return history.map((_, move) => {
            const desc = 'Go to move';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        <span className={move === this.state.stepNumber ? 'selected' : ''}>{desc}</span>
                    </button>
                </li>
            );
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = ticTacToeService.calculateWinner(current.squares);

        let status;
        if (winner) {
            status = `Winner is ${winner.player}`;
        } else {
            const moreMovements = current.squares.includes(null);
            status = moreMovements ? `Next player: ${this.state.xIsNext ? 'X' : 'O'}` : 'There wasn`t a winner try again';
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} higthLights={(winner || {}).positions || []}
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div><Sort history={this.state.history} onSort={(history, isOrderAsc) => this.setState({ history, isOrderAsc })} /></div>
                    {this.state.isOrderAsc ? <ol>{this.Moves}</ol> : <ol reversed>{this.Moves}</ol>}
                </div>
            </div>
        );
    }
}