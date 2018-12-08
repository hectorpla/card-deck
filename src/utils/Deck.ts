import * as Constant from "../types/constants";
import { Card, IDeck } from "../types/index";

const suits = [
  Constant.Clubs,
  Constant.Diamonds,
  Constant.Hearts,
  Constant.Spades
];

export class Deck implements IDeck {
  public cardArray: Card[];
  public current: number;

  constructor() {
    this.cardArray = [];
    for (let i = 0; i < 52; i++) {
      this.cardArray.push({
        id: i,
        suite: suits[Math.floor(i % 4)] as Constant.Suite, // bypass checking
        rank: Math.floor(i / 4) + 1
      });
    }
    this.current = 0;
  }

  public shuffle() {
    const a = this.cardArray;
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.current = 0;
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

  /**
   * get the first five only when it is used
   */
  public nextFive() {
    // TODO hard code
    if (this.current === 52) {
      return null;
    }
    const ahand = this.hand(5);
    this.current += ahand.length;
    return ahand;
  }

  public previousFive() {
    if (this.current === 0) {
      return null;
    }

    if (this.current === 52) {
      this.current = 50;
    }

    this.current -= 5;
    return this.hand(5);
  }
}
