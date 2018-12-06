import * as React from "react";
import { CardView } from "./CardView";
import { Card } from "./types";

import "./FiveCardView.css";

export interface Props {
  cards: Card[];
}

export const FiveCardView = (props: Props) => {
  return (
    <div className="five-cards">
      {props.cards.map(card => (
        <CardView cardId={card.id} key={card.id} />
      ))}
    </div>
  );
};
