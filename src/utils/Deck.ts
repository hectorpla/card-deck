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
        suite: suits[Math.floor(i % 4)] as Constant.Suite, // bypass checking
        rank: Math.floor(i / 4) + 1
      });
    }
  }

  public shuffle() {
    // TODO impl shuffle
  }

  /**
   * hand as many as possible, not gurantee hand n cards
   * `doesn't` change the current pointer
   * @param n number expected to be handed
   */
  public hand(n: number): Card[] {
    const actual = Math.min(n, this.cardArray.length - this.current);
    const cards = [];
    for (let i = 0; i < actual; i++) {
      cards.push(this.cardArray[this.current + i]);
    }
    return cards;
  }

  public nextFive() {
    // TODO hard code
    if (this.current === 50) {
      return null;
    }
    const ahand = this.hand(5);
    this.current += 5;
    return ahand;
  }

  public previousFive() {
    if (this.current === 0) {
      return null;
    }
    this.current -= 5;
    return this.hand(5);
  }
}
