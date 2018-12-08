import * as React from "react";
import { Card, IDeck } from "./types";

import "./CardDeckView.css";
import { FiveCardView } from "./FiveCardView";

export interface Props {
  deck: IDeck;
}

const useState = React.useState;
export const CardDeckView = ({ deck }: Props) => {
  const initialFive: Card[] = [];
  const [fiveCards, setFiveCards] = useState(initialFive!);

  const prevCardHandler = () => setFiveCards(deck.previousFive() || fiveCards);
  const nextCardHanlder = () => setFiveCards(deck.nextFive() || fiveCards);
  const shuffleAndReset = () => {
    deck.shuffle();
    setFiveCards([]);
  };

  return (
    <>
      <div className="card-deck">
        <button onClick={prevCardHandler}>
          <i className="material-icons card-nav">chevron_left</i>
        </button>
        {fiveCards.length === 0 && <p>get your first hand</p>}
        <FiveCardView cards={fiveCards} />
        <button onClick={nextCardHanlder}>
          <i className="material-icons card-nav">chevron_right</i>
        </button>
      </div>
      <div>
        <button onClick={shuffleAndReset}> shuffle </button>
      </div>
    </>
  );
};
