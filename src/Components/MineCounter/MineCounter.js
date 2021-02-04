import React from "react";

const MineCounter = (props) => {
	const { counter } = props;

	return <span>Mines:{counter}</span>;
};

export { MineCounter };
