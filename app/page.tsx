"use client";

import { useState } from "react";
import Image from "next/image";

type Screen = "welcome" | "question" | "time" | "final";

const noPositions = [
  { x: 130, y: -40 },
  { x: 40, y: 60 },
  { x: 210, y: 30 },
  { x: 100, y: -30 },
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [noClicks, setNoClicks] = useState(0);
  const timeOptions = ["10:00", "12:00", "2:00", "4:00"];
  const [time, setTime] = useState("");
  const [showText, setShowText] = useState(false);
  const [dodges, setDodges] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const caught = dodges > noPositions.length;


  function handleNo() {
    if (noClicks >= 3) {
      setScreen("time");
    } else {
      setNoClicks(noClicks + 1);
    }
  }

  function dodge() {
    if (caught) return;
    if (dodges < noPositions.length) {
      setNoPos(noPositions[dodges]);
    }
    setDodges(dodges + 1);
  }

  function handleContinue() {
    const audio = new Audio("/track.m4a");
    audio.currentTime = 47.5;
    audio.play();
    setScreen("final");
  }



  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {screen === "welcome" && (
        <>
          <h1 className="text-3xl font-bold">Rebecca, we have some unfinished business...</h1>
          <button
            onClick={() => setScreen("question")}
            className="mt-8 rounded-full bg-black px-8 py-3 text-white"
          >
            Get started
          </button>
        </>
      )}









      {screen === "question" && (

        <>
          <h1 className="text-3xl font-bold">Would you go on a tennis date with me on 11/10/2026?</h1>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setScreen("time")}
              className="rounded-full bg-black px-8 py-3 text-white"
            >
              Yes
            </button>
            <button
              onClick={handleNo}
              onMouseEnter={dodge}
              style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
              className="rounded-full border border-black px-8 py-3 transition-transform duration-200"
            >
              {noClicks >= 3 ? "I would love to go with such handsome gentleman" : "No"}
            </button>
          </div>
          {caught && noClicks === 0 && (
            <p className="mt-4 text-xl font-bold">Alright, you got me </p>
          )}


          {noClicks > 0 && (
            <p className="mt-4 text-xl font-bold">
              {noClicks === 1
                ? "Are you sure?"
                : noClicks === 2
                  ? "Think again..."
                  : "You leave me no choice..."}
            </p>

          )}
        </>
      )}












      {screen === "time" && (
        <>
          <h1 className="text-3xl font-bold">Pick a time</h1>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {timeOptions.map((option) => (
              <button
                key={option}
                onClick={() => setTime(option)}
                className={
                  time === option
                    ? "rounded-full bg-black px-6 py-3 text-white"
                    : "rounded-full border border-black px-6 py-3"
                }
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleContinue}
            disabled={time === ""}
            className="mt-8 rounded-full bg-black px-8 py-3 text-white disabled:opacity-30"
          >
            Continue


          </button>

        </>
      )}








      {screen === "final" && (
        <>
          <div className="spin-grow" onAnimationEnd={() => setShowText(true)}>
            <Image src="/rebecca.jpg" alt="Rebecca with a flower" width={250} height={250} />
          </div>
          {showText && (
            <h1 className="mt-8 text-3xl font-bold">See you then at {time}!</h1>
          )}
        </>
      )}

    </main>
  );
}