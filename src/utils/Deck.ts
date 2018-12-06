import * as Constant from "../types/constants";
import { Card, IDeck } from "../types/index";

const suits = [
  Constant.Clubs,
  Constant.Diamonds,
  Constant.Hearts,
  Constant.Spades
];

export class Deck implements IDeck {
  public cardArray: Card[] = [];
  public current = 0;

  constructor() {
    for (let i = 0; i < 52; i++) {
      this.cardArray.push({
        id: i,
        suite: suits[i % 4] as Constant.Suite, // bypass checking
        rank: i / 4 + 1
      });
    }
  }

  public shuffle() {
    // TODO impl shuffle
  }

  public hand(n: number): Card[] {
    const actual = Math.min(n, this.cardArray.length - this.current);
    const cards = [];
    for (let i = 0; i < actual; i++) {
      cards.push(this.cardArray[this.current++]);
    }
    return cards;
  }
}
