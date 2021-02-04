import { useEffect, useState } from "react";

function useTimer(maxDuration) {
	const [seconds, setSeconds] = useState(maxDuration);

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds((prevSeconts) => {
				const nextSeconds = prevSeconts - 1;
				if (nextSeconds === 0) {
					clearInterval(interval);
				}
				return nextSeconds;
			});
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return seconds;
}

export { useTimer };
