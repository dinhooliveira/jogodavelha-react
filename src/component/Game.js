import React from 'react';
import Board from './Board.js';
import ButtonOrder from './ButtoOrder.js';
import {calculateWinner, localizarJogada, squareVencedor, empate} from './module.js';


class Game extends React.Component {

    constructor(props) {
        super(props)
        {
            this.state = {
                history: [{
                    squares: Array(9).fill(null),
                    position: {col: 0, row: 0}
                }],
                stepNumber: 0,
                xIsNext: true
            }
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares,
                position: localizarJogada(i)
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });

    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) == 0
        })
    }

    orderClick() {
        this.setState({
            history: this.state.history.reverse()
        })

    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let squareVenc = [];

        const moves = history.map((step, move) => {
            const desc = move ?
                'Ir para jogada #' + move :
                'Ir para inicio do jogo';
            return (
                <li key={move}>
                    <button
                        onClick={() => this.jumpTo(move)}
                        className={move == this.state.stepNumber ? 'list-negrito ' : ''}
                    >{desc} - Coluna {step.position.col} Linha {step.position.row}
                    </button>
                </li>
            );
        });

        let status;

        if (winner) {
            status = 'Vencedor: ' + winner;
            squareVenc = squareVencedor(current.squares);
        } else if (!winner && empate(current.squares)) {
            status = 'Deu velha ';
        } else {
            status = 'Próximo Jogador: ' + (this.state.xIsNext ? 'X' : 'O');
        }


        return (
            <div className="game">
                <div className="game-board">
                    <h1>Jogo da Velha - {status}</h1>
                    <Board squares={current.squares} vencedor={squareVenc} onClick={(i) => this.handleClick(i)}></Board>
                </div>
                <div className="game-info">
                    <ButtonOrder title="Ordenar" onClick={() => this.orderClick()}></ButtonOrder>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

export default Game;