import * as React from "react";
import "./App.css";

import { CardDeckView } from "./CardDeckView";
import { Deck } from "./utils/Deck";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <CardDeckView deck={new Deck()} />
      </div>
    );
  }
}

export default App;
