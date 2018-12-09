import { IDeck } from "src/types";
import { Deck } from "./Deck";

const forwardTraverse = (d: IDeck) => {
  for (let i = 0; i < 10; i++) {
    const hand = d.nextFive()!;
    expect(hand).toEqual(d.hand(5));
    expect(hand.length).toBe(5);
    for (let j = 0; j < 5; j++) {
      expect(hand[j].id).toBe(i * 5 + j);
    }
  }
  const lasthand = d.nextFive()!;
  expect(lasthand).toEqual(d.hand(5));
  expect(lasthand.length).toBe(2);
  expect(lasthand[0].id).toBe(50);
  expect(lasthand[1].id).toBe(51);
  expect(d.nextFive()).toBeNull();
};

const backwardTraverse = (d: IDeck) => {
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

const roundTraverse = (d: IDeck) => {
  forwardTraverse(d);

  backwardTraverse(d);
};

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

  it("nextFive() to the end and then previousFive() to the head", () => {
    // same logic as the roundTraverse
    forwardTraverse(deck);
    backwardTraverse(deck);
  });

  it("nextFive() and previousFive(), two rounds", () => {
    roundTraverse(deck);
    // TODO it is now not valid to get 0-4 next, think about it
    // roundTraverse(deck);
  });

  it("alternate nextFive() and previousFive() from the start", () => {
    expect(deck.previousFive()).toBeNull();
    let firsthand = deck.nextFive()!;
    expect(firsthand.length).toBe(5);
    expect(firsthand[0].id).toBe(0);
    expect(firsthand[1].id).toBe(1);
    expect(firsthand[2].id).toBe(2);
    expect(firsthand[3].id).toBe(3);
    expect(firsthand[4].id).toBe(4);
    // no cards before 0
    expect(deck.previousFive()).toBeNull();

    const secondhand = deck.nextFive()!;
    expect(secondhand.length).toBe(5);
    expect(secondhand[0].id).toBe(5);
    expect(secondhand[1].id).toBe(6);
    expect(secondhand[2].id).toBe(7);
    expect(secondhand[3].id).toBe(8);
    expect(secondhand[4].id).toBe(9);

    // when at 5-9, previous() reverts to 1-4
    firsthand = deck.previousFive()!;
    expect(firsthand).toBeTruthy();
    expect(firsthand.length).toBe(5);
    expect(firsthand[0].id).toBe(0);
    expect(firsthand[1].id).toBe(1);
    expect(firsthand[2].id).toBe(2);
    expect(firsthand[3].id).toBe(3);
    expect(firsthand[4].id).toBe(4);

    expect(deck.previousFive()).toBeNull();
  });

  it("alternate previousFive() and nextFive() from the end", () => {
    forwardTraverse(deck);

    expect(deck.nextFive()).toBeNull();
    const lastSecondHand = deck.previousFive()!;
    expect(lastSecondHand.length).toBe(5);
    expect(lastSecondHand[0].id).toBe(45);
    expect(lastSecondHand[1].id).toBe(46);
    expect(lastSecondHand[2].id).toBe(47);
    expect(lastSecondHand[3].id).toBe(48);
    expect(lastSecondHand[4].id).toBe(49);

    const lasthand = deck.nextFive()!;
    expect(lasthand).toBeTruthy();
    expect(lasthand.length).toBe(2);
    expect(lasthand[0].id).toBe(50);
    expect(lasthand[1].id).toBe(51);
    expect(deck.nextFive()).toBeNull();
  });

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
