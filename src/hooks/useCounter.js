import { useCallback, useState } from "react";

function useCounter(initialValue) {
	const [counter, setCounter] = useState(initialValue);

	const increment = useCallback(
		(step = 1) => {
			setCounter((prevCounter) => {
				return prevCounter + step;
			});
		},
		[setCounter]
	);

	const decrement = useCallback(
		(step = 1) => {
			setCounter((prevCounter) => {
				return prevCounter - step;
			});
		},
		[setCounter]
	);

	return { counter, increment, decrement };
}

export { useCounter };
