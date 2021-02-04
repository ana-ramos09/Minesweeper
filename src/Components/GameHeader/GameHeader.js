import React from "react";
import { Gif } from "../Gif/Gif.js";
import { Timer } from "../Timer/Timer.js";
import { MineCounter } from "../MineCounter/MineCounter.js";
import "./style.css";

const GameHeader = (props) => {
	const { counter, duration } = props;

	return (
		<div className="game__header">
			<MineCounter counter={counter} />
			<Gif />
			<Timer duration={duration} />
		</div>
	);
};

export { GameHeader };
