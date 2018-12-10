import * as React from "react";
import { useEffect, useState } from "react";

import { Card, IDeck } from "./types";

import "./CardDeckView.css";
import { FiveCardView } from "./FiveCardView";

const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;

export interface Props {
  deck: IDeck;
}

export const CardDeckView = ({ deck }: Props) => {
  const [currentSection, setCurrentSection] = useState(-1); // bug: mind initial value
  const [sections, setSections] = useState<Card[][]>([]);

  const shuffleAndReset = () => {
    deck.shuffle();
    setSections([]);
    setCurrentSection(-1);
  };
  // TODO should debounce this operation, if the next not loaded
  const nextSectionHandler = () => {
    const nextSection = Math.min(currentSection + 1, 10);
    if (sections.length <= nextSection) {
      // lazy load
      const newFive = deck.nextFive()!;
      setSections([...sections, newFive]);
    }
    setCurrentSection(nextSection);
  };
  const prevSectionHandler = () => {
    setCurrentSection(Math.max(currentSection - 1, 0));
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const keyCode = event.keyCode;
    if (keyCode === KEY_LEFT_ARROW) {
      prevSectionHandler();
    }
    if (keyCode === KEY_RIGHT_ARROW) {
      nextSectionHandler();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return function cleanup() {
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <>
      <div className="card-deck">
        <button onClick={prevSectionHandler}>
          <i className="material-icons card-nav">chevron_left</i>
        </button>
        {sections.length === 0 && <p>get your first hand</p>}
        <div className="card-deck-slide">
          {sections.map((cards, i) => (
            <FiveCardView
              cards={cards}
              visible={i === currentSection}
              key={i}
            />
          ))}
        </div>
        <button onClick={nextSectionHandler}>
          <i className="material-icons card-nav">chevron_right</i>
        </button>
      </div>
      <div>
        <button onClick={shuffleAndReset}> shuffle </button>
      </div>
    </>
  );
};
