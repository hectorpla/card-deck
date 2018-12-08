import { Suite } from "./constants";

export interface State {
  deck: IDeck;
  readonly numOut: number;
  restart(): void;
}

export interface IDeck {
  readonly cardArray: Card[];
  shuffle(): void;
  hand(n: number): Card[];
  nextFive(): Card[] | null;
  previousFive(): Card[] | null;
}

export interface Card {
  readonly suite: Suite;
  readonly rank: number;
  readonly id: number; // for reference to assets
}

export interface FiveCardBundle {
  readonly cards: Card[];
}
