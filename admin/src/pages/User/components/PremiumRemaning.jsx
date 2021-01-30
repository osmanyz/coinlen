import React from 'react';

export default function PremiumRemaning({ date }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        // seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());
  // const [year] = React(new Date().getFullYear());

  /// @TODO: don't forget it. you should look at it!
  React.useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 10000);

    return () => clearTimeout(calculateTimeLeft());
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={Math.random()}>
        {timeLeft[interval]} {interval}{' '}
      </span>
    );
  });

  return <div>{timerComponents.length ? timerComponents : <span>Premium's End</span>}</div>;
}
