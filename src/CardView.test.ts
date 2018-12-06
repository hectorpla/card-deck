import { cardId2FileName } from "./CardView";

describe("CardView test", () => {
  describe("test cardId2FileName", () => {
    it("suite 1", () => {
      expect(cardId2FileName(0)).toBe("AD");
      expect(cardId2FileName(1)).toBe("AS");
      expect(cardId2FileName(10)).toBe("3H");

      expect(cardId2FileName(51)).toBe("KC");
      expect(cardId2FileName(47)).toBe("QC");
      expect(cardId2FileName(43)).toBe("JC");
      expect(cardId2FileName(42)).toBe("JH");
    });
  });
});
