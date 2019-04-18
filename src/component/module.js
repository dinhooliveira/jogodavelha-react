const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function calculateWinner(squares) {

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function squareVencedor(squares) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [a, b, c];
        }
    }
    return [];
}

function localizarJogada(i) {

    const list = [1, 2, 3, 1, 2, 3, 1, 2, 3];
    if (i <= 2) {
        return {row: 1, col: list[i]};
    } else if (i > 2 && i <= 5) {
        return {row: 2, col: list[i]};
    } else if (i > 5) {
        return {row: 3, col: list[i]};
    } else {
        return false;
    }
}

function empate(square) {

    let teveempate = true;
    square.forEach((value)=>{
        if (value === null){
            teveempate = false;
        }

    });

    return teveempate;

}

export {calculateWinner, localizarJogada, squareVencedor,empate};