"use client";
import { useState, useRef, useEffect } from "react";

type Drop = {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
};

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [currentNoPhrase, setCurrentNoPhrase] = useState("No");
  const [rainEmojis, setRainEmojis] = useState<Drop[]>([]);

  const lastIndexRef = useRef<number | null>(null);
  const rainIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const dropIdRef = useRef(0);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);

  const yesButtonSize = noCount * 20 + 16;

  const phrases = [
    "No 😡",
    "Are you sure? 🤨",
    "What if I asked really nicely? 🥺",
    "Pretty please 🫶✨",
    "Do you want a 'ferrero rocher'??? 🍫🤭",
    "What about biryaniii 🍛😋",
    "PLEASE MUNNUUUU 😭🙏",
    "But 😗💔",
    "I am going to die ⚰️😵",
    "Yep I'm dead 👻",
    "ok ur talking to bubu's ghost now 👻💬",
    "please kukiiiii 🥺💞",
    ":(((( 💔",
    "PRETTY PLEASE 🥹✨",
    ":* piggy please :* 😘🐷",
    "No 😞😭",
    "PLEASE I BEG YOU 🙏😭💀",
    "💥💥💥 CHAOS 💥💥💥",
    "I WILL TURN INTO A PUMPKIN 🎃💀",
    "SPIRITS APPROVE 👻👻👻",
  ];

  const chaosEmojis = ["💥", "🎃", "👻", "✨", "🔥", "💫", "🌧️"];

  const getNoButtonText = () => {
    let index: number;
    do {
      index = Math.floor(Math.random() * phrases.length);
    } while (index === lastIndexRef.current && phrases.length > 1);

    lastIndexRef.current = index;
    return phrases[index];
  };

  const handleNoClick = () => {
    setNoCount((c) => c + 1);
    setCurrentNoPhrase(getNoButtonText());

    if (noButtonRef.current) {
      noButtonRef.current.classList.add("shake");
      setTimeout(
        () => noButtonRef.current?.classList.remove("shake"),
        400
      );
    }

    if (noCount >= 2) {
      document.body.style.backgroundColor = `hsl(${Math.random() * 360},70%,90%)`;
    }
  };

  /* Stable continuous rain */
  useEffect(() => {
    if (noCount >= 2 && !yesPressed && !rainIntervalRef.current) {
      rainIntervalRef.current = setInterval(() => {
        const drop: Drop = {
          id: dropIdRef.current++,
          emoji:
            chaosEmojis[Math.floor(Math.random() * chaosEmojis.length)],
          left: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 3 + 4,
        };

        setRainEmojis((prev) => [...prev, drop]);
      }, 120);
    }

    if (yesPressed && rainIntervalRef.current) {
      clearInterval(rainIntervalRef.current);
      rainIntervalRef.current = null;
      setRainEmojis([]);
    }
  }, [noCount, yesPressed]);

  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center relative overflow-hidden">
      {yesPressed ? (
        <>
          <img
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
            alt="bear kiss"
          />
          <div className="my-4 text-4xl font-bold">
            WOOOOOO!!! I love you chonkulya!! 😘🎉❤️
          </div>
        </>
      ) : (
        <>
          <img
            className="h-[200px]"
            src="https://media.tenor.com/dVr8gUFNKLYAAAAi/milk-and-mocha-cute.gif"
            alt="bear"
          />

          <h1 className="my-4 text-4xl">
            Will you be my Valentine?
          </h1>

          <div className="flex items-center">
            <button
              className="mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>

            <button
              ref={noButtonRef}
              onClick={handleNoClick}
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              {currentNoPhrase}
            </button>
          </div>
        </>
      )}

      {/* Rain */}
      {rainEmojis.map((r) => (
        <span
          key={r.id}
          style={{
            position: "absolute",
            top: "-2rem",
            left: `${r.left}%`,
            fontSize: `${r.size}rem`,
            animation: `fall ${r.duration}s linear forwards`,
            pointerEvents: "none",
          }}
          onAnimationEnd={() =>
            setRainEmojis((prev) => prev.filter((d) => d.id !== r.id))
          }
        >
          {r.emoji}
        </span>
      ))}

      <style jsx>{`
        @keyframes fall {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(120vh);
            opacity: 0;
          }
        }

        .shake {
          animation: shake 0.4s;
        }

        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
