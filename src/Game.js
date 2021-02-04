import React, { useRef } from "react";
import Matrix from "./Components/Matrix/Matrix.js";
import { GameHeader } from "./Components/GameHeader/GameHeader.js";
import { useCounter } from "./hooks/useCounter.js";
import { useTimer } from "./hooks/useTimer.js";
import "./Game.css";

const Game = () => {
	const { counter, decrement, increment } = useCounter(50);
	const timer = useTimer(600);
	const reference = useRef("");

	return (
		<div className="game">
			<h3 ref={reference} className="game__title">
				Minesweeper
			</h3>
			<div className="game__container">
				<GameHeader counter={counter} duration={600} />
				<Matrix
					rows={20}
					cols={21}
					onMineFlagged={decrement}
					onMineUnflagged={increment}
				/>
			</div>
			<br />
			<br />
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center,",
					width: "350px",
				}}
			></div>
		</div>
	);
};

export default Game;
