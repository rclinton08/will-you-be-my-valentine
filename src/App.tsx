"use client";
import { useState } from "react";
import { useRef } from "react";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;
  const lastIndexRef = useRef<number | null>(null);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "Are you sure?",
      "What if I asked really nicely?",
      "Pretty please",
      "Do you want a 'ferrero rocher'???",
      "What about biryaniii",
      "PLEASE MUNNUUUU",
      "But :*(",
      "I am going to die",
      "Yep im dead",
      "ok ur talking to bubu's ghost",
      "please kukiiiii",
      ":((((",
      "PRETTY PLEASE",
      ":* piggy please :*",
      "No :(",
    ];

  //   return phrases[Math.min(noCount, phrases.length - 1)];
  // };


    //  loop through randomly
      let index;

      do {
        index = Math.floor(Math.random() * phrases.length);
      } while (index === lastIndexRef.current && phrases.length > 1);

      lastIndexRef.current = index;
      return phrases[index];
    };

  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center">
      {yesPressed ? (
        <>
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
          <div className="my-4 text-4xl font-bold">WOOOOOO!!! I love you chonl=kulya!! :* :* ;))</div>
        </>
      ) : (
        <>
          <img
            className="h-[200px]"
            src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
          />
          <h1 className="my-4 text-4xl">Will you be my Valentine?</h1>
          <div className="flex items-center">
            <button
              className={`mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700`}
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className=" rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
