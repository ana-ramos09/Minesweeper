import React, { useState, useEffect } from "react";
import Square from "../Square/Square";
import "./style.css";

const SquareState = {
	CLOSED: "CLOSED",
	FLAGGED: "FLAGGED",
	OPEN: "OPEN",
	QUESTION: "QUESTION",
};

const Matrix = (props) => {
	const [squares, setSquares] = useState([]);

	function generateMatrix() {
		let matrix = [];

		for (let i = 0; i < props.cols; i++) {
			const column = [];

			for (let j = 0; j < props.rows; j++) {
				column.push({
					id: `R${j}C${i}`,
					column: i,
					row: j,
					bomb: false,
					number: 0,
					state: SquareState.CLOSED,
				});
			}

			matrix.push(column);
		}
		return matrix;
	}

	function rand(min, max) {
		return Math.trunc(Math.random() * (max - min) + min);
	}

	function placeBomb(matrix) {
		let bombs = 50;

		while (bombs > 0) {
			const col = rand(0, props.cols);
			const row = rand(0, props.rows);
			if (matrix[col][row].bomb === false) {
				matrix[col][row].bomb = true;
				bombs = bombs - 1;
			}
		}

		return matrix;
	}

	function findBomb(matrix, column, row, offsetColumn, offsetRow) {
		let hasBomb = false;
		const x = column - offsetColumn;
		const y = row - offsetRow;
		const columnIsInRange = x >= 0 && x < props.cols;
		const rowIsInRange = y >= 0 && y < props.rows;

		if (columnIsInRange && rowIsInRange && matrix[x][y].bomb) {
			hasBomb = true;
		}

		return hasBomb;
	}

	// function findBomb(arr, row, column, offsetRow, offsetColumn) {
	// 	let hasBomb = false;
	// 	arr.forEach((item, index) => {
	// 		if (
	// 			item[index].row === row + offsetRow &&
	// 			item[index].column === column + offsetColumn
	// 		) {
	// 			if (item[index].bomb) {
	// 				hasBomb = true;
	// 			} else {
	// 				hasBomb = false;
	// 			}
	// 		}
	// 	});
	// 	return hasBomb;
	// }

	function placeNumber(matrix) {
		matrix.forEach((column, index) => {
			column.forEach((square) => {
				const col = square.column;
				const row = square.row;

				if (!square.bomb) {
					if (findBomb(matrix, col, row, -1, -1)) {
						square.number += 1;
					}
					if (findBomb(matrix, col, row, -1, 0)) {
						square.number += 1;
					}
					if (findBomb(matrix, col, row, -1, 1)) {
						square.number += 1;
					}
					if (findBomb(matrix, col, row, 0, -1)) {
						square.number += 1;
					}
					if (findBomb(matrix, col, row, 0, 1)) {
						square.number += 1;
					}
					if (findBomb(matrix, col, row, 1, -1)) {
						square.number += 1;
					}
					if (findBomb(matrix, col, row, 1, 0)) {
						square.number += 1;
					}
					if (findBomb(matrix, col, row, 1, 1)) {
						square.number += 1;
					}
				}
			});
		});

		return matrix;
	}

	// function handleRightClick(id) {
	// 	console.log("onRightCLick", id);
	// 	const square = squares.find((item, index) => {
	// 		return item.id === id;
	// 	});
	// 	console.log(`O tipo da constante square é: ${typeof square}`);
	// 	if (square.flag) {
	// 		props.onMineUnflagged();
	// 	} else {
	// 		props.onMineFlagged();
	// 	}

	// 	setSquares((prevSquares) => {
	// 		return prevSquares.map((prevSquare) => {
	// 			if (prevSquare.id !== id) {
	// 				return prevSquare;
	// 			}

	// 			return {
	// 				...prevSquare,
	// 				flag: !prevSquare.flag,
	// 			};
	// 		});
	// 	});
	// }

	function handleRightClick(column, row) {
		const square = squares[column][row];
		if (square.state === SquareState.FLAGGED) {
			props.onMineUnflagged();
		} else if (square.state === SquareState.CLOSED) {
			props.onMineFlagged();
		}

		setSquares((prevSquares) => {
			const newSquares = [...prevSquares];
			newSquares[column] = [...newSquares[column]];
			newSquares[column][row] = { ...newSquares[column][row] };

			if (newSquares[column][row].state === SquareState.FLAGGED) {
				newSquares[column][row].state = SquareState.CLOSED;
			} else if (newSquares[column][row].state === SquareState.CLOSED) {
				newSquares[column][row].state = SquareState.FLAGGED;
			}

			return newSquares;
		});
	}

	useEffect(() => {
		let matrix = generateMatrix();
		placeBomb(matrix);
		placeNumber(matrix);
		setSquares(matrix);
		console.log(matrix);
	}, []);

	return (
		<div className="matrix">
			{squares.map((column) => {
				return column.map((square) => {
					return (
						<Square
							key={square.id}
							square={square}
							onRightClick={handleRightClick}
							onLeftClick={handleRightClick}
						/>
					);
				});
			})}
		</div>
	);
};

export default Matrix;
