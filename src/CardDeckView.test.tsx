import * as React from "react";
import * as ReactDOM from "react-dom";
import { CardDeckView } from "./CardDeckView";
import { Deck } from "./utils/Deck";

it("initial states", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CardDeckView deck={new Deck()} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
