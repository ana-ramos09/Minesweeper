import React from "react";

const Timer = ({ duration }) => {
	return <span>Timer:{duration > 0 ? duration : "BOOM!"}</span>;
};

export { Timer };
