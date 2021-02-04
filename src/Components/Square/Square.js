import React, { useState, useEffect } from "react";
import clsx from "clsx";
import "./style.css";

import bomb from "../../images/originals/flag.png";
import question from "../../images/originals/question-mark.png";

const Square = (props) => {
	const { square } = props;

	const handleClick = (event) => {
		if (event.button === 2) {
			console.log(`Right Click`);
			props.onRightClick(square.column, square.row);
		} else if (event.button === 0) {
			console.log(event.target.id);
		}
	};

	const classes = clsx("square", {
		"square--flagged": square.flag,
		"square--question": square.question,
		"square-bomb": square.bomb,
	});

	return <div className={classes} onMouseUp={handleClick} />;
};

export default Square;
