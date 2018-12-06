import * as React from "react";
import "./CardView.css";

export interface Props {
  cardId: number;
}

export function cardId2FileName(id: number): string {
  const rank = Math.floor(id / 4) + 1;
  const suit = id % 4;

  const rank2special = {
    1: "A",
    11: "J",
    12: "Q",
    13: "K"
  };

  const suitId = ["D", "S", "H", "C"];
  // console.log(rank2special[rank] || rank);
  return `${rank2special[rank] || rank}${suitId[suit]}`;
}

// TODO make the height a prop
export const CardView = ({ cardId }: Props) => {
  // invariant: cardId in [0, 51]
  const fileName = cardId2FileName(cardId);

  return (
    <div className="card-frame" style={{ height: 200 }}>
      <img
        className="card"
        src={`/PockerCardsImages/${fileName}.png`}
        alt={fileName}
      />
    </div>
  );
};
