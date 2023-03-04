/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752
import cx from "classnames";
import { useEffect, useState } from "react";
import timerImg from "src/assets/images/timer.svg";
import { borderRadius } from "src/consts";

interface TimerProps {
  isActive: boolean;
  onTimeout: () => void;
}

const timerUpdateFrequency = 100; // ms
const gameTime = 30 * 60 * 1000; // 30 min in ms

const Timer: React.FC<TimerProps> = ({ isActive, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(gameTime);

  useEffect(
    function startTimer() {
      if (timeLeft === 0) {
        onTimeout();
        return;
      }

      let intervalId: NodeJS.Timer | undefined;

      if (timeLeft > 0 && isActive) {
        intervalId = setInterval(() => {
          const newTimeLeft = Math.max(0, timeLeft - timerUpdateFrequency);
          setTimeLeft(newTimeLeft);
        }, timerUpdateFrequency);
      }

      return () => clearInterval(intervalId);
    },
    [isActive, timeLeft, onTimeout]
  );

  return (
    <div className={cx({ active: isActive })} css={timerStyles}>
      <img
        draggable="false"
        src={timerImg}
        alt="timer"
        css={{
          transform: `rotate(-${(Math.floor(timeLeft / 1000) % 4) * 90}deg)`,
          visibility: isActive ? "visible" : "hidden",
        }}
      />
      {convertMillisecondsToTime(timeLeft)}
    </div>
  );
};

export default Timer;

function convertMillisecondsToTime(milliseconds: number) {
  const minNum = Math.floor(milliseconds / 1000 / 60);
  const secNum = Math.floor((milliseconds / 1000) % 60);
  const msNum = Math.floor((milliseconds % 1000) / 100);

  const minStr = String(minNum).padStart(2, "0");
  const secStr = String(secNum).padStart(2, "0");
  const msStr = String(msNum).padStart(1, "0");

  return `${minStr}:${secStr}${minNum === 0 && secNum < 10 ? "." + msStr : ""}`;
}

const timerStyles = {
  color: "#7f7f7f",
  backgroundColor: "#2c2926",
  padding: "0 0.5em",
  borderRadius,
  fontWeight: "bold",
  fontFamily: "monospace",
  fontSize: 25,

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1em",

  "&.active": {
    backgroundColor: "white",
    color: "black",
  },
};
