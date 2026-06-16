import React, { useEffect, useRef, useState } from "react";

const safePadding = 18;
const escapeDistance = 120;
const celebrationBurstCount = 34;
const fallingSymbols = ["💖", "💕", "💘", "❤️", "💗", "🌹"];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function buildHeart(index) {
  return {
    id: `${Date.now()}-${index}-${Math.random()}`,
    symbol: fallingSymbols[Math.floor(Math.random() * fallingSymbols.length)],
    left: `${randomBetween(0, 100)}vw`,
    size: `${randomBetween(1.2, 2.4)}rem`,
    duration: `${randomBetween(3.2, 6.4)}s`,
    drift: `${randomBetween(-90, 90)}px`,
    delay: `${index * 75}ms`,
  };
}

export default function App() {
  const noButtonRef = useRef(null);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState(null);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (!isCelebrating) {
      return undefined;
    }

    setHearts(Array.from({ length: celebrationBurstCount }, (_, index) => buildHeart(index)));

    const intervalId = window.setInterval(() => {
      setHearts((currentHearts) => [...currentHearts.slice(-80), buildHeart(currentHearts.length)]);
    }, 280);

    return () => window.clearInterval(intervalId);
  }, [isCelebrating]);

  function moveNoButton() {
    const noButton = noButtonRef.current;

    if (!noButton) {
      return;
    }

    const buttonRect = noButton.getBoundingClientRect();
    const maxX = Math.max(safePadding, window.innerWidth - buttonRect.width - safePadding);
    const maxY = Math.max(safePadding, window.innerHeight - buttonRect.height - safePadding);

    setNoButtonPosition({
      left: randomBetween(safePadding, maxX),
      top: randomBetween(safePadding, maxY),
    });
  }

  function isPointerCloseToNoButton(event) {
    const noButton = noButtonRef.current;

    if (!noButton) {
      return false;
    }

    const rect = noButton.getBoundingClientRect();
    const pointerX = event.clientX;
    const pointerY = event.clientY;
    const closestX = Math.max(rect.left, Math.min(pointerX, rect.right));
    const closestY = Math.max(rect.top, Math.min(pointerY, rect.bottom));
    const distance = Math.hypot(pointerX - closestX, pointerY - closestY);

    return distance < escapeDistance;
  }

  function handlePointerMove(event) {
    if (!isCelebrating && isPointerCloseToNoButton(event)) {
      moveNoButton();
    }
  }

  function handleTouchStart(event) {
    event.preventDefault();
    moveNoButton();
  }

  function startCelebration() {
    setIsCelebrating(true);
  }

  if (isCelebrating) {
    return (
      <section className="celebration" aria-live="polite">
        {hearts.map((heart) => (
          <span
            aria-hidden="true"
            className="falling-heart"
            key={heart.id}
            style={{
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              fontSize: heart.size,
              left: heart.left,
              "--drift": heart.drift,
            }}
          >
            {heart.symbol}
          </span>
        ))}

        <div className="celebration-card">
          <div className="sparkle" aria-hidden="true">💖</div>
          <h2>Yay!Lovess Youss</h2>
          <p>Pick a date and time.</p>

          <form className="date-form" action="https://formsubmit.co/iamshubhamsingh26@gmail.com" method="POST">
            <input type="hidden" name="_subject" value="Date proposal accepted ❤️" />
            <input type="hidden" name="_captcha" value="false" />

            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="date" required />

            <label htmlFor="time">Time</label>
            <input id="time" name="time" type="time" required />

            <label htmlFor="location">Location <span>(optional)</span></label>
            <input id="location" name="location" type="text" placeholder="Cafe, park, restaurant..." />

            <button className="btn btn-submit" type="submit">Send my date plan ❤️</button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <main className="page" onMouseMove={handlePointerMove}>
      <section className="proposal-card" aria-labelledby="proposalTitle">
        <div className="heart-badge" aria-hidden="true">❤️</div>
        <p className="eyebrow">A tiny question from my heart</p>
        <h1 id="proposalTitle">Will you go on a date with me?</h1>
        <p className="subtitle">Free Pick and Drop+Flowersss. ❤️</p>

        <div className="button-row" aria-label="Proposal choices">
          <button className="btn btn-yes" type="button" onClick={startCelebration}>Yes</button>
          <button
            className={`btn btn-no${noButtonPosition ? " is-running" : ""}`}
            ref={noButtonRef}
            type="button"
            style={noButtonPosition ?? undefined}
            onFocus={moveNoButton}
            onMouseEnter={moveNoButton}
            onTouchStart={handleTouchStart}
          >
            No
          </button>
        </div>
      </section>
    </main>
  );
}
