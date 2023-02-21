/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import cx from "classnames";
import { borderRadius } from "src/consts";
import timerImg from "src/assets/images/timer.svg";

interface TimerProps {
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ isActive }) => {
  const [timeLeft, setTimeLeft] = useState(/* 30 * 60 */ 12);

  useEffect(
    function startTimer() {
      let intervalId: NodeJS.Timer | undefined;

      if (timeLeft > 0 && isActive) {
        intervalId = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
      }

      return () => clearInterval(intervalId);
    },
    [isActive, timeLeft]
  );

  return (
    <div className={cx({ active: isActive })} css={timerStyles}>
      <img
        src={timerImg}
        alt="timer"
        css={{
          transform: `rotate(-${(timeLeft % 4) * 90}deg)`,
          visibility: isActive ? "visible" : "hidden",
        }}
      />
      {convertSecondsToTime(timeLeft)}
    </div>
  );
};

export default Timer;

function convertSecondsToTime(seconds: number) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");

  return `${min}:${sec}`;
}

const timerStyles = {
  color: "white",
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
