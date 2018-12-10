import * as React from "react";
import { useEffect, useState } from "react";
import { CardView } from "./CardView";
import { Card } from "./types";

import "./FiveCardView.css";

export interface Props {
  cards: Card[];
  visible: boolean;
}

export const FiveCardView = ({ visible, cards }: Props) => {
  const [status, setStatus] = useState({
    error: false,
    loading: true,
    assocImageUrl: ""
  });

  // make the effect only happens when mounted
  useEffect(
    () => {
      fetch("https://source.unsplash.com/random").then(res =>
        setStatus({
          error: false,
          loading: false,
          assocImageUrl: res.url
        })
      );
    },
    [status.assocImageUrl, cards] // diff states and props
  );

  // console.log(status.assocImageUrl);
  return (
    <div style={{ display: visible ? undefined : "none" }}>
      {status.loading && <p>image loading...</p>}
      {status.assocImageUrl && (
        <div className="five-cards-assoc-image">
          <img
            style={{ height: 450 }}
            src={status.assocImageUrl}
            alt="image-from-unsplash"
          />
        </div>
      )}
      <div className="five-cards">
        {cards.map(card => (
          <CardView cardId={card.id} key={card.id} />
        ))}
      </div>
    </div>
  );
};
