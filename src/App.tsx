import * as React from "react";
import "./App.css";

// import { CardView } from "./CardView";
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

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p> */}
        <FiveCardView cards={mockCards} />
      </div>
    );
  }
}

export default App;
