import * as React from "react";
import * as ReactDOM from "react-dom";
import { FiveCardView } from "./FiveCardView";
import { Card } from "./types";

// invalid data
const mockCards: Card[] = [
  { id: 0, suite: "Clubs", rank: 1 },
  { id: 9, suite: "Clubs", rank: 1 },
  { id: 11, suite: "Clubs", rank: 1 },
  { id: 33, suite: "Clubs", rank: 1 },
  { id: 50, suite: "Clubs", rank: 1 }
];

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FiveCardView cards={mockCards} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
