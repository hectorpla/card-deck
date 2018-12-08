import * as React from "react";
import { IDeck } from "./types";

import "./CardDeckView.css";
import { FiveCardView } from "./FiveCardView";

export interface Props {
  deck: IDeck;
}

const useState = React.useState;
export const CardDeckView = ({ deck }: Props) => {
  const initialFive = deck.nextFive();
  const [fiveCards, setFiveCards] = useState(initialFive!);

  const prevCardHandler = () => setFiveCards(deck.previousFive() || fiveCards);
  const nextCardHanlder = () => setFiveCards(deck.nextFive() || fiveCards);

  return (
    <div className="card-deck">
      <button onClick={prevCardHandler}>
        <i className="material-icons card-nav">chevron_left</i>
      </button>
      <FiveCardView cards={fiveCards} />
      <button onClick={nextCardHanlder}>
        <i className="material-icons card-nav">chevron_right</i>
      </button>
    </div>
  );
};
