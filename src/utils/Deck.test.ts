import { IDeck } from "src/types";
import { Deck } from "./Deck";

describe("test Deck", () => {
  let deck: IDeck;
  beforeEach(() => {
    deck = new Deck();
  });

  it("test init", () => {
    const allcards = deck.cardArray;

    expect(allcards[0].id).toBe(0);
    expect(allcards[1].id).toBe(1);
    expect(allcards[23].id).toBe(23);
    expect(allcards[30].id).toBe(30);
  });

  it("test hand 1", () => {
    const hand1 = deck.hand(1);
    expect(hand1.length).toBe(1);
    expect(hand1[0].id).toBe(0);
  });

  it("test hand 2", () => {
    const hand2 = deck.hand(2);
    // console.log(hand2);
    expect(hand2.length).toBe(2);
    expect(hand2[0].id).toBe(0);
    expect(hand2[1].id).toBe(1);
  });

  it("test hand 5", () => {
    const hand = deck.hand(5);
    expect(hand.length).toBe(5);
    expect(hand[0].id).toBe(0);
    expect(hand[1].id).toBe(1);
    expect(hand[2].id).toBe(2);
    expect(hand[3].id).toBe(3);
    expect(hand[4].id).toBe(4);
  });

  it("test hand() doesn't change current pointer", () => {
    for (let i = 0; i < 3; i++) {
      const hand = deck.hand(5);
      expect(hand.length).toBe(5);
      expect(hand[0].id).toBe(0);
      expect(hand[1].id).toBe(1);
      expect(hand[2].id).toBe(2);
      expect(hand[3].id).toBe(3);
      expect(hand[4].id).toBe(4);
    }
  });

  const roundTraverse = (d: IDeck) => {
    for (let i = 0; i < 10; i++) {
      const hand = d.hand(5);
      expect(hand).toEqual(d.nextFive());
      expect(hand.length).toBe(5);
      for (let j = 0; j < 5; j++) {
        expect(hand[j].id).toBe(i * 5 + j);
      }
    }

    const lasthand = d.hand(5);
    expect(lasthand).toEqual(d.nextFive());
    expect(lasthand.length).toBe(2);
    expect(lasthand[0].id).toBe(50);
    expect(lasthand[1].id).toBe(51);
    expect(d.nextFive()).toBeNull();

    for (let i = 9; i >= 0; i--) {
      const hand = d.previousFive()!;
      expect(hand).toBeTruthy();
      expect(hand).toEqual(d.hand(5));
      expect(hand.length).toBe(5);
      for (let j = 0; j < 5; j++) {
        expect(hand[j].id).toBe(i * 5 + j);
      }
    }
    expect(d.previousFive()).toBeNull();
  };

  it("nextFive() to the end and then previousFive() to the head", () => {
    roundTraverse(deck);
  });

  it("nextFive() and previousFive(), two rounds", () => {
    roundTraverse(deck);
    roundTraverse(deck);
  });

  const shuffleAndTraverse = (d: IDeck) => {
    d.shuffle();
    for (let i = 0; i < 10; i++) {
      const hand = d.nextFive()!;
      expect(hand.length).toBe(5);
    }

    const lasthand = d.nextFive()!;
    expect(lasthand.length).toBe(2);
    expect(d.nextFive()).toBeNull();

    for (let i = 0; i < 10; i++) {
      const hand = d.previousFive()!;
      expect(hand.length).toBe(5);
    }
    expect(d.previousFive()).toBeNull();
  };

  it("shuffle()", () => {
    shuffleAndTraverse(deck);
    shuffleAndTraverse(deck);
  });

  it("shuffle() with nextFive()", () => {
    deck.nextFive();
    deck.nextFive();
    shuffleAndTraverse(deck);
    deck.nextFive();
    deck.nextFive();
    shuffleAndTraverse(deck);
  });
});
