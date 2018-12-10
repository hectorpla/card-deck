import * as React from "react";
import "./App.css";

import { CardDeckView } from "./CardDeckView";
import { Deck } from "./utils/Deck";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <h2 className="App-logo">Remember card deck: improve your memory!</h2>
        <CardDeckView deck={new Deck()} />
      </div>
    );
  }
}

export default App;
